-- 1. Academic Structures (Sessions, Terms, Classes, Subjects)
-- Note: Reusing existing tenant/campus structures.

-- Academic Subjects Registry
CREATE TABLE public.subjects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50),
    category VARCHAR(100), -- e.g., 'Sciences', 'Arts', 'Commercial'
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, name)
);

-- 2. Grading Rules
CREATE TABLE public.grading_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.grading_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES public.grading_schemes(id) ON DELETE CASCADE,
    grade VARCHAR(10) NOT NULL,
    min_score DECIMAL(5,2) NOT NULL,
    max_score DECIMAL(5,2) NOT NULL,
    remark VARCHAR(255),
    grade_point DECIMAL(3,2),
    is_pass BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Student Results Table
CREATE TYPE public.result_status AS ENUM ('draft', 'submitted', 'reviewed', 'approved', 'returned');

CREATE TABLE public.academic_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    class_id VARCHAR(50) NOT NULL, -- Logical link to existing class identifiers
    academic_session VARCHAR(20) NOT NULL,
    term VARCHAR(20) NOT NULL,
    teacher_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    
    ca_score DECIMAL(5,2) DEFAULT 0,
    exam_score DECIMAL(5,2) DEFAULT 0,
    total_score DECIMAL(5,2) GENERATED ALWAYS AS (ca_score + exam_score) STORED,
    
    grade VARCHAR(10),
    teacher_comment TEXT,
    status public.result_status DEFAULT 'draft',
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(tenant_id, student_id, subject_id, academic_session, term)
);

-- 4. Result Audit Trail
CREATE TABLE public.academic_results_audit (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    result_id UUID NOT NULL REFERENCES public.academic_results(id) ON DELETE CASCADE,
    changed_by UUID NOT NULL REFERENCES auth.users(id),
    old_status public.result_status,
    new_status public.result_status,
    old_scores JSONB,
    new_scores JSONB,
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. RLS & Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON public.subjects TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.grading_schemes TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.grading_rules TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.academic_results TO authenticated;
GRANT SELECT, INSERT ON public.academic_results_audit TO authenticated;

GRANT ALL ON public.subjects TO service_role;
GRANT ALL ON public.grading_schemes TO service_role;
GRANT ALL ON public.grading_rules TO service_role;
GRANT ALL ON public.academic_results TO service_role;
GRANT ALL ON public.academic_results_audit TO service_role;

ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grading_schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grading_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academic_results_audit ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Tenant isolation for subjects" ON public.subjects
    FOR ALL TO authenticated USING (tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Tenant isolation for grading_schemes" ON public.grading_schemes
    FOR ALL TO authenticated USING (tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Tenant isolation for grading_rules" ON public.grading_rules
    FOR ALL TO authenticated USING (scheme_id IN (SELECT id FROM public.grading_schemes WHERE tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid())));

CREATE POLICY "Tenant isolation for academic_results" ON public.academic_results
    FOR ALL TO authenticated USING (tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid()));

CREATE POLICY "Tenant isolation for academic_results_audit" ON public.academic_results_audit
    FOR ALL TO authenticated USING (result_id IN (SELECT id FROM public.academic_results WHERE tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid())));

