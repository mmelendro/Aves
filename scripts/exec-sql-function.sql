-- Create a function to execute arbitrary SQL (for admin use only)
CREATE OR REPLACE FUNCTION exec_sql(sql text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result json;
BEGIN
    -- Only allow execution by service role or admin users
    IF current_setting('role') != 'service_role' AND 
       NOT EXISTS (
           SELECT 1 FROM auth.users 
           WHERE id = auth.uid() 
           AND raw_app_meta_data->>'role' = 'admin'
       ) THEN
        RAISE EXCEPTION 'Unauthorized: Admin access required';
    END IF;
    
    -- Execute the SQL and return results
    EXECUTE sql;
    
    -- Return success status
    result := json_build_object('success', true, 'message', 'SQL executed successfully');
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Return error details
        result := json_build_object(
            'success', false, 
            'error', SQLERRM,
            'error_code', SQLSTATE
        );
        RETURN result;
END;
$$;

-- Grant execute permission to authenticated users (will be restricted by function logic)
GRANT EXECUTE ON FUNCTION exec_sql(text) TO authenticated;

-- Create a function to get database schema information
CREATE OR REPLACE FUNCTION get_database_schema()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    schema_info json;
BEGIN
    -- Get comprehensive schema information
    WITH table_info AS (
        SELECT 
            t.table_name,
            t.table_type,
            json_agg(
                json_build_object(
                    'column_name', c.column_name,
                    'data_type', c.data_type,
                    'is_nullable', c.is_nullable,
                    'column_default', c.column_default,
                    'character_maximum_length', c.character_maximum_length
                ) ORDER BY c.ordinal_position
            ) as columns
        FROM information_schema.tables t
        LEFT JOIN information_schema.columns c ON t.table_name = c.table_name
        WHERE t.table_schema = 'public'
        AND t.table_type = 'BASE TABLE'
        GROUP BY t.table_name, t.table_type
    ),
    constraint_info AS (
        SELECT 
            tc.table_name,
            json_agg(
                json_build_object(
                    'constraint_name', tc.constraint_name,
                    'constraint_type', tc.constraint_type,
                    'column_name', kcu.column_name,
                    'foreign_table_name', ccu.table_name,
                    'foreign_column_name', ccu.column_name
                )
            ) as constraints
        FROM information_schema.table_constraints tc
        LEFT JOIN information_schema.key_column_usage kcu 
            ON tc.constraint_name = kcu.constraint_name
        LEFT JOIN information_schema.constraint_column_usage ccu 
            ON tc.constraint_name = ccu.constraint_name
        WHERE tc.table_schema = 'public'
        GROUP BY tc.table_name
    ),
    index_info AS (
        SELECT 
            schemaname,
            tablename,
            json_agg(
                json_build_object(
                    'indexname', indexname,
                    'indexdef', indexdef
                )
            ) as indexes
        FROM pg_indexes
        WHERE schemaname = 'public'
        GROUP BY schemaname, tablename
    )
    SELECT json_build_object(
        'tables', json_agg(
            json_build_object(
                'table_name', ti.table_name,
                'table_type', ti.table_type,
                'columns', ti.columns,
                'constraints', COALESCE(ci.constraints, '[]'::json),
                'indexes', COALESCE(ii.indexes, '[]'::json)
            )
        ),
        'functions', (
            SELECT json_agg(
                json_build_object(
                    'function_name', routine_name,
                    'return_type', data_type,
                    'language', external_language
                )
            )
            FROM information_schema.routines
            WHERE routine_schema = 'public'
        ),
        'triggers', (
            SELECT json_agg(
                json_build_object(
                    'trigger_name', trigger_name,
                    'table_name', event_object_table,
                    'action_timing', action_timing,
                    'event_manipulation', event_manipulation
                )
            )
            FROM information_schema.triggers
            WHERE trigger_schema = 'public'
        )
    ) INTO schema_info
    FROM table_info ti
    LEFT JOIN constraint_info ci ON ti.table_name = ci.table_name
    LEFT JOIN index_info ii ON ti.table_name = ii.tablename;
    
    RETURN schema_info;
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_database_schema() TO authenticated;

-- Create a function to get RLS policies
CREATE OR REPLACE FUNCTION get_rls_policies()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    policies_info json;
BEGIN
    SELECT json_agg(
        json_build_object(
            'schemaname', schemaname,
            'tablename', tablename,
            'policyname', policyname,
            'permissive', permissive,
            'roles', roles,
            'cmd', cmd,
            'qual', qual,
            'with_check', with_check
        )
    ) INTO policies_info
    FROM pg_policies
    WHERE schemaname = 'public';
    
    RETURN COALESCE(policies_info, '[]'::json);
END;
$$;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION get_rls_policies() TO authenticated;
