-- Report PIN System Migration

-- 1. Create Enums
DO $$ BEGIN
    CREATE TYPE public.pin_status AS ENUM ('active', 'exhausted', 'deactivated', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Create Tables
CREATE TABLE public.report_pins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id uuid NOT NULL,
    session_id text NOT NULL,
    term_id text NOT NULL,
    class_id text NOT NULL,
    pin_code text NOT NULL,
    usage_limit integer,
    usage_count integer DEFAULT 0,
    status public.pin_status DEFAULT 'active',
    expires_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    created_by uuid REFERENCES auth.users(id),
    UNIQUE(tenant_id, student_id, session_id, term_id)
);

CREATE TABLE public.report_pin_access_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    pin_id uuid NOT NULL REFERENCES public.report_pins(id) ON DELETE CASCADE,
    accessed_at timestamptz DEFAULT now(),
    ip_address text,
    user_agent text,
    success boolean DEFAULT true
);

-- 3. Grants (MANDATORY for PostgREST)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.report_pins TO authenticated;
GRANT ALL ON public.report_pins TO service_role;
GRANT SELECT ON public.report_pins TO anon;

GRANT SELECT, INSERT ON public.report_pin_access_logs TO authenticated;
GRANT INSERT ON public.report_pin_access_logs TO anon;
GRANT ALL ON public.report_pin_access_logs TO service_role;

-- 4. Enable RLS
ALTER TABLE public.report_pins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_pin_access_logs ENABLE ROW LEVEL SECURITY;

-- 5. Policies
CREATE POLICY "Admins manage report pins" ON public.report_pins
FOR ALL TO authenticated
USING (public.can_admin_tenant(auth.uid(), tenant_id));

CREATE POLICY "Public can verify active pins" ON public.report_pins
FOR SELECT TO anon
USING (status = 'active' AND (expires_at IS NULL OR expires_at > now()));

CREATE POLICY "Admins view access logs" ON public.report_pin_access_logs
FOR SELECT TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.report_pins 
    WHERE report_pins.id = report_pin_access_logs.pin_id 
    AND public.can_admin_tenant(auth.uid(), report_pins.tenant_id)
));

-- 6. Redemption Function
CREATE OR REPLACE FUNCTION public.redeem_report_pin(_pin_code text, _tenant_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_pin_record RECORD;
BEGIN
    SELECT * INTO v_pin_record
    FROM public.report_pins
    WHERE pin_code = _pin_code AND tenant_id = _tenant_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RETURN json_build_object('success', false, 'error', 'Invalid PIN');
    END IF;

    IF v_pin_record.status != 'active' THEN
        RETURN json_build_object('success', false, 'error', 'PIN is ' || v_pin_record.status);
    END IF;

    IF v_pin_record.expires_at IS NOT NULL AND v_pin_record.expires_at < now() THEN
        UPDATE public.report_pins SET status = 'expired' WHERE id = v_pin_record.id;
        RETURN json_build_object('success', false, 'error', 'PIN has expired');
    END IF;

    IF v_pin_record.usage_limit IS NOT NULL AND v_pin_record.usage_count >= v_pin_record.usage_limit THEN
        UPDATE public.report_pins SET status = 'exhausted' WHERE id = v_pin_record.id;
        RETURN json_build_object('success', false, 'error', 'PIN usage limit reached');
    END IF;

    -- Increment usage
    UPDATE public.report_pins 
    SET usage_count = usage_count + 1,
        status = CASE 
            WHEN usage_limit IS NOT NULL AND usage_count + 1 >= usage_limit THEN 'exhausted'::public.pin_status 
            ELSE 'active'::public.pin_status 
        END,
        updated_at = now()
    WHERE id = v_pin_record.id;

    -- Log access
    INSERT INTO public.report_pin_access_logs (pin_id, success)
    VALUES (v_pin_record.id, true);

    RETURN json_build_object(
        'success', true, 
        'student_id', v_pin_record.student_id,
        'class_id', v_pin_record.class_id,
        'session_id', v_pin_record.session_id,
        'term_id', v_pin_record.term_id
    );
END;
$$;
-- Seed Test Data
INSERT INTO public.tenants (id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'Test School', 'test-school-fixture')
ON CONFLICT (id) DO NOTHING;
