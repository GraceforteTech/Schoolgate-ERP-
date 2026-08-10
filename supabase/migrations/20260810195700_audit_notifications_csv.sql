-- 1. Notifications Table
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'RESULT_PUBLISHED', 'FEE_DUE', etc.
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    metadata JSONB,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- 'pending', 'sent', 'delivered', 'failed', 'read'
    provider_ref TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    read_at TIMESTAMP WITH TIME ZONE
);

GRANT SELECT, INSERT, UPDATE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
ON public.notifications
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can insert notifications for their tenant"
ON public.notifications
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'school_admin') OR public.has_role(auth.uid(), 'school_owner') OR public.has_role(auth.uid(), 'platform_admin'));

-- 2. Audit Log Security Refinement (Read-only for school admins)
-- Revoke all but select for authenticated users on audit_logs
REVOKE INSERT, UPDATE, DELETE ON public.audit_logs FROM authenticated;
GRANT SELECT ON public.audit_logs TO authenticated;

-- Ensure RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- If policy exists, drop it to re-create with strict read-only
DROP POLICY IF EXISTS "Admins can view their own tenant audit logs" ON public.audit_logs;
CREATE POLICY "Admins can view their own tenant audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (
    tenant_id = (SELECT tenant_id FROM memberships WHERE user_id = auth.uid() AND is_active = true LIMIT 1)
    AND (public.has_role(auth.uid(), 'school_admin') OR public.has_role(auth.uid(), 'school_owner') OR public.has_role(auth.uid(), 'platform_admin'))
);

-- 3. Trigger for Result Publish Notifications
CREATE OR REPLACE FUNCTION public.notify_on_result_publish()
RETURNS TRIGGER AS $$
DECLARE
    student_record RECORD;
    parent_user_id_val UUID;
    student_user_id_val UUID;
BEGIN
    -- Check if status changed to 'published'
    IF (NEW.status = 'published' AND (OLD.status IS NULL OR OLD.status != 'published')) THEN
        -- Get student and parent info
        SELECT s.full_name, s.parent_id, p.user_id as parent_user_id, s.student_user_id
        INTO student_record
        FROM public.students s
        LEFT JOIN public.profiles p ON s.parent_id = p.id
        WHERE s.id = NEW.student_id;

        -- Notify Parent if exists
        IF student_record.parent_user_id IS NOT NULL THEN
            INSERT INTO public.notifications (tenant_id, user_id, type, title, message, metadata)
            VALUES (
                NEW.tenant_id,
                student_record.parent_user_id,
                'RESULT_PUBLISHED',
                'Result Published',
                'Your student ' || student_record.full_name || '''s result for ' || NEW.term || ' ' || NEW.academic_session || ' is now available.',
                jsonb_build_object('student_id', NEW.student_id, 'result_id', NEW.id)
            );
        END IF;

        -- Notify Student if user linked
        IF student_record.student_user_id IS NOT NULL THEN
            -- Find the student's auth.user_id from profiles
            SELECT user_id INTO student_user_id_val FROM public.profiles WHERE id = student_record.student_user_id;
            
            IF student_user_id_val IS NOT NULL THEN
                INSERT INTO public.notifications (tenant_id, user_id, type, title, message, metadata)
                VALUES (
                    NEW.tenant_id,
                    student_user_id_val,
                    'RESULT_PUBLISHED',
                    'Result Published',
                    'Your result for ' || NEW.term || ' ' || NEW.academic_session || ' is now available.',
                    jsonb_build_object('student_id', NEW.student_id, 'result_id', NEW.id)
                );
            END IF;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER tr_notify_on_result_publish
AFTER UPDATE ON public.academic_results
FOR EACH ROW
EXECUTE FUNCTION public.notify_on_result_publish();

