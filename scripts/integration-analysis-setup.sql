-- Create integration analysis logging tables
-- Run this script in your Supabase SQL editor

-- Create analysis_logs table for storing analysis results
CREATE TABLE IF NOT EXISTS analysis_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_type VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    test_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pass', 'fail', 'warning', 'info')),
    message TEXT,
    details JSONB,
    recommendations TEXT[],
    priority VARCHAR(20) NOT NULL CHECK (priority IN ('critical', 'high', 'medium', 'low')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analysis_reports table for storing complete analysis reports
CREATE TABLE IF NOT EXISTS analysis_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_type VARCHAR(50) NOT NULL,
    summary JSONB NOT NULL,
    total_tests INTEGER NOT NULL,
    passed_tests INTEGER NOT NULL,
    failed_tests INTEGER NOT NULL,
    warnings INTEGER NOT NULL,
    critical_issues INTEGER NOT NULL,
    health_score INTEGER NOT NULL,
    recommendations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance_metrics table for tracking performance over time
CREATE TABLE IF NOT EXISTS performance_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value NUMERIC NOT NULL,
    metric_unit VARCHAR(20),
    category VARCHAR(50) NOT NULL,
    metadata JSONB,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create security_audit_log table for security-related events
CREATE TABLE IF NOT EXISTS security_audit_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
    description TEXT NOT NULL,
    user_id UUID REFERENCES auth.users(id),
    ip_address INET,
    user_agent TEXT,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analysis_logs_category ON analysis_logs(category);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_status ON analysis_logs(status);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_priority ON analysis_logs(priority);
CREATE INDEX IF NOT EXISTS idx_analysis_logs_created_at ON analysis_logs(created_at);

CREATE INDEX IF NOT EXISTS idx_analysis_reports_report_type ON analysis_reports(report_type);
CREATE INDEX IF NOT EXISTS idx_analysis_reports_created_at ON analysis_reports(created_at);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_metric_name ON performance_metrics(metric_name);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_category ON performance_metrics(category);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_recorded_at ON performance_metrics(recorded_at);

CREATE INDEX IF NOT EXISTS idx_security_audit_log_event_type ON security_audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_severity ON security_audit_log(severity);
CREATE INDEX IF NOT EXISTS idx_security_audit_log_created_at ON security_audit_log(created_at);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE analysis_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analysis_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE security_audit_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for admin access
-- Note: Adjust these policies based on your authentication and authorization requirements

-- Policy for analysis_logs - only authenticated users can read, only service role can write
CREATE POLICY "analysis_logs_read_policy" ON analysis_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "analysis_logs_write_policy" ON analysis_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Policy for analysis_reports - only authenticated users can read, only service role can write
CREATE POLICY "analysis_reports_read_policy" ON analysis_reports
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "analysis_reports_write_policy" ON analysis_reports
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Policy for performance_metrics - only authenticated users can read, only service role can write
CREATE POLICY "performance_metrics_read_policy" ON performance_metrics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "performance_metrics_write_policy" ON performance_metrics
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Policy for security_audit_log - only service role can read/write
CREATE POLICY "security_audit_log_read_policy" ON security_audit_log
    FOR SELECT USING (auth.role() = 'service_role');

CREATE POLICY "security_audit_log_write_policy" ON security_audit_log
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_analysis_logs_updated_at 
    BEFORE UPDATE ON analysis_logs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create a function to log performance metrics
CREATE OR REPLACE FUNCTION log_performance_metric(
    p_metric_name VARCHAR(100),
    p_metric_value NUMERIC,
    p_metric_unit VARCHAR(20) DEFAULT NULL,
    p_category VARCHAR(50) DEFAULT 'general',
    p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    metric_id UUID;
BEGIN
    INSERT INTO performance_metrics (metric_name, metric_value, metric_unit, category, metadata)
    VALUES (p_metric_name, p_metric_value, p_metric_unit, p_category, p_metadata)
    RETURNING id INTO metric_id;
    
    RETURN metric_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to log security events
CREATE OR REPLACE FUNCTION log_security_event(
    p_event_type VARCHAR(50),
    p_severity VARCHAR(20),
    p_description TEXT,
    p_user_id UUID DEFAULT NULL,
    p_ip_address INET DEFAULT NULL,
    p_user_agent TEXT DEFAULT NULL,
    p_metadata JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO security_audit_log (event_type, severity, description, user_id, ip_address, user_agent, metadata)
    VALUES (p_event_type, p_severity, p_description, p_user_id, p_ip_address, p_user_agent, p_metadata)
    RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for analysis summary
CREATE OR REPLACE VIEW analysis_summary AS
SELECT 
    category,
    COUNT(*) as total_tests,
    COUNT(*) FILTER (WHERE status = 'pass') as passed_tests,
    COUNT(*) FILTER (WHERE status = 'fail') as failed_tests,
    COUNT(*) FILTER (WHERE status = 'warning') as warning_tests,
    COUNT(*) FILTER (WHERE priority = 'critical') as critical_issues,
    ROUND(
        (COUNT(*) FILTER (WHERE status = 'pass') * 100.0 / COUNT(*)), 2
    ) as pass_rate
FROM analysis_logs
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY category
ORDER BY category;

-- Grant necessary permissions
GRANT SELECT ON analysis_summary TO authenticated;
GRANT EXECUTE ON FUNCTION log_performance_metric TO service_role;
GRANT EXECUTE ON FUNCTION log_security_event TO service_role;

-- Insert some sample data for testing (optional)
-- Uncomment the following lines if you want to insert test data

/*
INSERT INTO analysis_logs (analysis_type, category, test_name, status, message, priority) VALUES
('integration', 'functionality', 'Database Connection', 'pass', 'Successfully connected to database', 'low'),
('integration', 'security', 'Environment Configuration', 'pass', 'Environment variables properly configured', 'low'),
('integration', 'performance', 'Query Performance', 'warning', 'Some queries are slower than expected', 'medium');

INSERT INTO analysis_reports (report_type, summary, total_tests, passed_tests, failed_tests, warnings, critical_issues, health_score) VALUES
('integration', '{"categories": ["functionality", "security", "performance"]}', 10, 7, 1, 2, 0, 85);
*/

-- Create notification for completed setup
DO $$
BEGIN
    RAISE NOTICE 'Integration analysis tables and functions have been created successfully!';
    RAISE NOTICE 'You can now run the Supabase integration analysis from your application.';
END $$;
