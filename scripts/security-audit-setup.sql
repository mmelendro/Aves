-- AVES Colombia Security Audit Database Setup
-- This script creates additional security monitoring and audit capabilities

-- Create security_events table for real-time security monitoring
CREATE TABLE IF NOT EXISTS public.security_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    severity TEXT NOT NULL CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    ip_address INET,
    user_agent TEXT,
    event_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    CONSTRAINT security_events_event_type_not_empty CHECK (length(event_type) > 0)
);

-- Create security_policies table for dynamic security policy management
CREATE TABLE IF NOT EXISTS public.security_policies (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    policy_name TEXT NOT NULL UNIQUE,
    policy_type TEXT NOT NULL,
    policy_config JSONB NOT NULL DEFAULT '{}',
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    
    CONSTRAINT security_policies_name_not_empty CHECK (length(policy_name) > 0)
);

-- Create failed_login_attempts table for brute force protection
CREATE TABLE IF NOT EXISTS public.failed_login_attempts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL,
    ip_address INET NOT NULL,
    attempt_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    user_agent TEXT,
    
    CONSTRAINT failed_login_attempts_email_not_empty CHECK (length(email) > 0)
);

-- Create security_audit_log table for audit trail
CREATE TABLE IF NOT EXISTS public.security_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    audit_type TEXT NOT NULL,
    table_name TEXT,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    
    CONSTRAINT security_audit_log_type_not_empty CHECK (length(audit_type) > 0)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS security_events_type_idx ON public.security_events(event_type);
CREATE INDEX IF NOT EXISTS security_events_severity_idx ON public.security_events(severity);
CREATE INDEX IF NOT EXISTS security_events_user_id_idx ON public.security_events(user_id);
CREATE INDEX IF NOT EXISTS security_events_created_at_idx ON public.security_events(created_at);
CREATE INDEX IF NOT EXISTS security_events_ip_address_idx ON public.security_events(ip_address);

CREATE INDEX IF NOT EXISTS security_policies_name_idx ON public.security_policies(policy_name);
CREATE INDEX IF NOT EXISTS security_policies_type_idx ON public.security_policies(policy_type);
CREATE INDEX IF NOT EXISTS security_policies_enabled_idx ON public.security_policies(enabled);

CREATE INDEX IF NOT EXISTS failed_login_attempts_email_idx ON public.failed_login_attempts(email);
CREATE INDEX IF NOT EXISTS failed_login_attempts_ip_idx ON public.failed_login_attempts(ip_address);
CREATE INDEX IF NOT EXISTS failed_login_attempts_time_idx ON public.failed_login_attempts(attempt_time);

CREATE INDEX IF NOT EXISTS security_audit_log_type_idx ON public.security_audit_log(audit_type);
CREATE INDEX IF NOT EXISTS security_audit_log_table_idx ON public.security_audit_log(table_name);
CREATE INDEX IF NOT EXISTS security_audit_log_user_idx ON public.security_audit_log(user_id);
CREATE INDEX IF NOT EXISTS security_audit_log_created_at_idx ON public.security_audit_log(created_at);

-- Enable Row Level Security on new tables
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.failed_login_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for security_events
CREATE POLICY "Admins can view all security events" ON public.security_events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Users can view own security events" ON public.security_events
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert security events" ON public.security_events
    FOR INSERT WITH CHECK (true);

-- RLS Policies for security_policies
CREATE POLICY "Admins can manage security policies" ON public.security_policies
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- RLS Policies for failed_login_attempts
CREATE POLICY "Admins can view failed login attempts" ON public.failed_login_attempts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "System can insert failed login attempts" ON public.failed_login_attempts
    FOR INSERT WITH CHECK (true);

-- RLS Policies for security_audit_log
CREATE POLICY "Admins can view security audit log" ON public.security_audit_log
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "System can insert security audit log" ON public.security_audit_log
    FOR INSERT WITH CHECK (true);

-- Security Functions

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
    p_event_type TEXT,
    p_severity TEXT,
    p_user_id UUID DEFAULT NULL,
    p_event_data JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO public.security_events (
        event_type,
        severity,
        user_id,
        ip_address,
        user_agent,
        event_data
    ) VALUES (
        p_event_type,
        p_severity,
        p_user_id,
        inet_client_addr(),
        current_setting('request.headers', true)::jsonb->>'user-agent',
        p_event_data
    ) RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check failed login attempts (brute force protection)
CREATE OR REPLACE FUNCTION public.check_failed_login_attempts(
    p_email TEXT,
    p_ip_address INET DEFAULT NULL
)
RETURNS JSONB AS $$
DECLARE
    email_attempts INTEGER;
    ip_attempts INTEGER;
    result JSONB;
BEGIN
    -- Count failed attempts for email in last hour
    SELECT COUNT(*) INTO email_attempts
    FROM public.failed_login_attempts
    WHERE email = p_email
    AND attempt_time > NOW() - INTERVAL '1 hour';
    
    -- Count failed attempts for IP in last hour
    SELECT COUNT(*) INTO ip_attempts
    FROM public.failed_login_attempts
    WHERE ip_address = COALESCE(p_ip_address, inet_client_addr())
    AND attempt_time > NOW() - INTERVAL '1 hour';
    
    result := jsonb_build_object(
        'email_attempts', email_attempts,
        'ip_attempts', ip_attempts,
        'email_blocked', email_attempts >= 5,
        'ip_blocked', ip_attempts >= 10,
        'blocked', email_attempts >= 5 OR ip_attempts >= 10
    );
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to record failed login attempt
CREATE OR REPLACE FUNCTION public.record_failed_login(
    p_email TEXT,
    p_user_agent TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO public.failed_login_attempts (
        email,
        ip_address,
        user_agent
    ) VALUES (
        p_email,
        inet_client_addr(),
        p_user_agent
    );
    
    -- Log security event
    PERFORM public.log_security_event(
        'failed_login_attempt',
        'MEDIUM',
        NULL,
        jsonb_build_object('email', p_email)
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean old security data
CREATE OR REPLACE FUNCTION public.cleanup_security_data()
RETURNS VOID AS $$
BEGIN
    -- Clean failed login attempts older than 24 hours
    DELETE FROM public.failed_login_attempts
    WHERE attempt_time < NOW() - INTERVAL '24 hours';
    
    -- Clean resolved security events older than 30 days
    DELETE FROM public.security_events
    WHERE resolved_at IS NOT NULL
    AND resolved_at < NOW() - INTERVAL '30 days';
    
    -- Clean audit logs older than 90 days (keep for compliance)
    DELETE FROM public.security_audit_log
    WHERE created_at < NOW() - INTERVAL '90 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get security metrics
CREATE OR REPLACE FUNCTION public.get_security_metrics()
RETURNS JSONB AS $$
DECLARE
    metrics JSONB;
BEGIN
    SELECT jsonb_build_object(
        'total_security_events', (
            SELECT COUNT(*) FROM public.security_events
            WHERE created_at > NOW() - INTERVAL '24 hours'
        ),
        'critical_events', (
            SELECT COUNT(*) FROM public.security_events
            WHERE severity = 'CRITICAL'
            AND created_at > NOW() - INTERVAL '24 hours'
        ),
        'failed_logins_24h', (
            SELECT COUNT(*) FROM public.failed_login_attempts
            WHERE attempt_time > NOW() - INTERVAL '24 hours'
        ),
        'unique_ips_24h', (
            SELECT COUNT(DISTINCT ip_address) FROM public.failed_login_attempts
            WHERE attempt_time > NOW() - INTERVAL '24 hours'
        ),
        'active_policies', (
            SELECT COUNT(*) FROM public.security_policies
            WHERE enabled = true
        )
    ) INTO metrics;
    
    RETURN metrics;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger function for audit logging
CREATE OR REPLACE FUNCTION public.audit_trigger_function()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        INSERT INTO public.security_audit_log (
            audit_type,
            table_name,
            record_id,
            old_values,
            user_id,
            ip_address
        ) VALUES (
            'DELETE',
            TG_TABLE_NAME,
            OLD.id,
            to_jsonb(OLD),
            auth.uid(),
            inet_client_addr()
        );
        RETURN OLD;
    ELSIF TG_OP = 'UPDATE' THEN
        INSERT INTO public.security_audit_log (
            audit_type,
            table_name,
            record_id,
            old_values,
            new_values,
            user_id,
            ip_address
        ) VALUES (
            'UPDATE',
            TG_TABLE_NAME,
            NEW.id,
            to_jsonb(OLD),
            to_jsonb(NEW),
            auth.uid(),
            inet_client_addr()
        );
        RETURN NEW;
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO public.security_audit_log (
            audit_type,
            table_name,
            record_id,
            new_values,
            user_id,
            ip_address
        ) VALUES (
            'INSERT',
            TG_TABLE_NAME,
            NEW.id,
            to_jsonb(NEW),
            auth.uid(),
            inet_client_addr()
        );
        RETURN NEW;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers for sensitive tables
DROP TRIGGER IF EXISTS profiles_audit_trigger ON public.profiles;
CREATE TRIGGER profiles_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

DROP TRIGGER IF EXISTS bookings_audit_trigger ON public.bookings;
CREATE TRIGGER bookings_audit_trigger
    AFTER INSERT OR UPDATE OR DELETE ON public.bookings
    FOR EACH ROW EXECUTE FUNCTION public.audit_trigger_function();

-- Insert default security policies
INSERT INTO public.security_policies (policy_name, policy_type, policy_config, enabled) VALUES
('password_policy', 'authentication', '{"min_length": 8, "require_uppercase": true, "require_lowercase": true, "require_numbers": true, "require_special": false}', true),
('session_timeout', 'session', '{"timeout_minutes": 60, "extend_on_activity": true}', true),
('failed_login_limit', 'brute_force', '{"max_attempts": 5, "lockout_duration_minutes": 60}', true),
('ip_rate_limit', 'rate_limiting', '{"requests_per_minute": 100, "burst_limit": 200}', true),
('data_retention', 'compliance', '{"audit_log_days": 90, "security_events_days": 30, "failed_attempts_hours": 24}', true)
ON CONFLICT (policy_name) DO NOTHING;

-- Create a view for security dashboard
CREATE OR REPLACE VIEW public.security_dashboard AS
SELECT 
    'security_events' as metric_type,
    COUNT(*) as total_count,
    COUNT(*) FILTER (WHERE severity = 'CRITICAL') as critical_count,
    COUNT(*) FILTER (WHERE severity = 'HIGH') as high_count,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h_count
FROM public.security_events
UNION ALL
SELECT 
    'failed_logins' as metric_type,
    COUNT(*) as total_count,
    0 as critical_count,
    0 as high_count,
    COUNT(*) FILTER (WHERE attempt_time > NOW() - INTERVAL '24 hours') as last_24h_count
FROM public.failed_login_attempts
UNION ALL
SELECT 
    'audit_logs' as metric_type,
    COUNT(*) as total_count,
    0 as critical_count,
    0 as high_count,
    COUNT(*) FILTER (WHERE created_at > NOW() - INTERVAL '24 hours') as last_24h_count
FROM public.security_audit_log;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

-- Create a scheduled job to clean up old data (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-security-data', '0 2 * * *', 'SELECT public.cleanup_security_data();');

COMMENT ON TABLE public.security_events IS 'Real-time security event monitoring';
COMMENT ON TABLE public.security_policies IS 'Dynamic security policy configuration';
COMMENT ON TABLE public.failed_login_attempts IS 'Failed login tracking for brute force protection';
COMMENT ON TABLE public.security_audit_log IS 'Comprehensive audit trail for all data changes';
COMMENT ON FUNCTION public.log_security_event IS 'Function to log security events with automatic IP and user agent detection';
COMMENT ON FUNCTION public.check_failed_login_attempts IS 'Function to check for brute force attacks';
COMMENT ON FUNCTION public.cleanup_security_data IS 'Function to clean up old security data for performance';
