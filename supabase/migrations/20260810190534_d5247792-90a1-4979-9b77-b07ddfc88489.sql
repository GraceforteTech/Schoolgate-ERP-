-- 1. Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_name TEXT,
    user_role public.app_role,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    description TEXT,
    old_values JSONB,
    new_values JSONB,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Grant permissions
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;

-- 3. Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policy for Audit Logs (Tenant Isolation)
CREATE POLICY "Users can see their own tenant's audit logs"
ON public.audit_logs
FOR SELECT
TO authenticated
USING (
    tenant_id IN (
        SELECT m.tenant_id FROM public.memberships m WHERE m.user_id = auth.uid() AND m.is_active = true
    )
);

-- 5. Add Waiver/Adjustment columns to student_fees if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'student_fees' AND COLUMN_NAME = 'waived_amount') THEN
        ALTER TABLE public.student_fees ADD COLUMN waived_amount DECIMAL(15,2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'student_fees' AND COLUMN_NAME = 'adjustment_amount') THEN
        ALTER TABLE public.student_fees ADD COLUMN adjustment_amount DECIMAL(15,2) DEFAULT 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'student_fees' AND COLUMN_NAME = 'adjustment_reason') THEN
        ALTER TABLE public.student_fees ADD COLUMN adjustment_reason TEXT;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'student_fees' AND COLUMN_NAME = 'adjusted_by') THEN
        ALTER TABLE public.student_fees ADD COLUMN adjusted_by UUID REFERENCES auth.users(id);
    END IF;
END $$;
