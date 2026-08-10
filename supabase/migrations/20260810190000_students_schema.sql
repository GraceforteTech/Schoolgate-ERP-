-- 1. Students Table
CREATE TABLE IF NOT EXISTS public.students (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    campus_id uuid REFERENCES public.campuses(id) ON DELETE SET NULL,
    parent_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    admission_number text NOT NULL,
    full_name text NOT NULL,
    class_id text,
    status text DEFAULT 'active',
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(tenant_id, admission_number)
);

-- 2. RLS & Grants
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students TO authenticated;
GRANT ALL ON public.students TO service_role;

-- 3. Policies
DROP POLICY IF EXISTS "Members view students" ON public.students;
CREATE POLICY "Members view students" ON public.students FOR SELECT TO authenticated USING (public.is_member(auth.uid(), tenant_id));

DROP POLICY IF EXISTS "Parents view own children" ON public.students;
CREATE POLICY "Parents view own children" ON public.students FOR SELECT TO authenticated USING (parent_id = auth.uid());

DROP POLICY IF EXISTS "Admins manage students" ON public.students;
CREATE POLICY "Admins manage students" ON public.students FOR ALL TO authenticated USING (public.can_admin_tenant(auth.uid(), tenant_id));
