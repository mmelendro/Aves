-- Create a function to execute arbitrary SQL (for admin use only)
-- This function should only be used by service role or admin users
CREATE OR REPLACE FUNCTION exec_sql(sql TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    rec RECORD;
    results JSON[] := '{}';
BEGIN
    -- Security check: only allow service role or admin users
    IF NOT (
        auth.jwt() ->> 'role' = 'service_role' OR
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = auth.uid() 
            AND raw_app_meta_data->>'role' = 'admin'
        )
    ) THEN
        RAISE EXCEPTION 'Insufficient privileges to execute SQL';
    END IF;

    -- Log the SQL execution attempt
    INSERT INTO audit_log (
        user_id,
        action,
        table_name,
        details,
        created_at
    ) VALUES (
        COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000000'),
        'EXEC_SQL',
        'system',
        jsonb_build_object('sql', sql),
        NOW()
    );

    -- Execute the SQL
    BEGIN
        EXECUTE sql;
        
        -- Return success result
        result := json_build_object(
            'success', true,
            'message', 'SQL executed successfully',
            'executed_at', NOW()
        );
        
    EXCEPTION WHEN OTHERS THEN
        -- Return error result
        result := json_build_object(
            'success', false,
            'error', SQLERRM,
            'sqlstate', SQLSTATE,
            'executed_at', NOW()
        );
    END;

    RETURN result;
END;
$$;

-- Create audit log table if it doesn't exist
CREATE TABLE IF NOT EXISTS audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID,
    action TEXT NOT NULL,
    table_name TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on audit log
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Create policy for audit log (admin only)
CREATE POLICY "Admins can view audit log" ON audit_log
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM auth.users 
            WHERE id = auth.uid() 
            AND raw_app_meta_data->>'role' = 'admin'
        )
    );

-- Grant execute permission to authenticated users (will be restricted by function logic)
GRANT EXECUTE ON FUNCTION exec_sql(TEXT) TO authenticated;

-- Add comments for documentation
COMMENT ON FUNCTION exec_sql(TEXT) IS 'Execute arbitrary SQL with admin/service role privileges. All executions are logged for audit purposes.';
COMMENT ON TABLE audit_log IS 'Audit log for tracking database administrative actions';
