-- 1. Lesson Note Status Enum
CREATE TYPE public.lesson_note_status AS ENUM ('draft', 'submitted', 'reviewed', 'approved', 'returned');

-- 2. Lesson Notes Table
CREATE TABLE public.lesson_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    campus_id UUID REFERENCES public.campuses(id) ON DELETE SET NULL,
    teacher_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    academic_session VARCHAR(20) NOT NULL,
    term VARCHAR(20) NOT NULL,
    week INTEGER NOT NULL,
    lesson_date DATE NOT NULL,
    class_id VARCHAR(50) NOT NULL, -- Link to class registry later
    subject_id VARCHAR(50) NOT NULL, -- Link to subject registry later
    topic TEXT NOT NULL,
    sub_topic TEXT,
    learning_objectives TEXT,
    previous_knowledge TEXT,
    instructional_materials TEXT,
    introduction TEXT,
    presentation TEXT,
    teacher_activities TEXT,
    student_activities TEXT,
    assessment TEXT,
    homework TEXT,
    conclusion TEXT,
    references TEXT,
    duration VARCHAR(50),
    status public.lesson_note_status DEFAULT 'draft',
    reviewer_id UUID REFERENCES auth.users(id),
    review_date TIMESTAMPTZ,
    review_comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Lesson Note Audit Trail
CREATE TABLE public.lesson_note_audit_trail (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_note_id UUID NOT NULL REFERENCES public.lesson_notes(id) ON DELETE CASCADE,
    old_status public.lesson_note_status,
    new_status public.lesson_note_status NOT NULL,
    changed_by UUID NOT NULL REFERENCES auth.users(id),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Biometric Device Table
CREATE TYPE public.biometric_device_status AS ENUM ('connected', 'disconnected', 'pending', 'error');

CREATE TABLE public.biometric_devices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    device_type VARCHAR(50) NOT NULL, -- 'fingerprint', 'facial', 'rfid', etc.
    manufacturer VARCHAR(100),
    model VARCHAR(100),
    serial_number VARCHAR(100),
    location TEXT,
    status public.biometric_device_status DEFAULT 'pending',
    last_sync TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Attendance Records (Enhanced)
CREATE TABLE public.attendance_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    person_id UUID NOT NULL, -- Can be student_id or profile_id (staff)
    person_type VARCHAR(20) NOT NULL, -- 'student', 'staff'
    date DATE NOT NULL,
    check_in TIMESTAMPTZ,
    check_out TIMESTAMPTZ,
    device_id UUID REFERENCES public.biometric_devices(id),
    location TEXT,
    status VARCHAR(50) DEFAULT 'present', -- 'present', 'late', 'absent', etc.
    source VARCHAR(50) DEFAULT 'manual', -- 'manual', 'biometric'
    sync_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS & Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON public.lesson_notes TO authenticated;
GRANT SELECT, INSERT ON public.lesson_note_audit_trail TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.biometric_devices TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance_records TO authenticated;

GRANT ALL ON public.lesson_notes TO service_role;
GRANT ALL ON public.lesson_note_audit_trail TO service_role;
GRANT ALL ON public.biometric_devices TO service_role;
GRANT ALL ON public.attendance_records TO service_role;

ALTER TABLE public.lesson_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_note_audit_trail ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.biometric_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance_records ENABLE ROW LEVEL SECURITY;

-- Lesson Notes: Owners can manage theirs, admins can review all in tenant
CREATE POLICY "Users can manage their own lesson notes" ON public.lesson_notes
    FOR ALL TO authenticated USING (teacher_id = auth.uid());

CREATE POLICY "Admins can view all lesson notes in tenant" ON public.lesson_notes
    FOR SELECT TO authenticated USING (tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid()));

-- Biometrics: All members of tenant can see
CREATE POLICY "Members can view devices" ON public.biometric_devices
    FOR SELECT TO authenticated USING (tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid()));

-- Attendance: Members view, owners (parents/students) view their own
CREATE POLICY "Members can view attendance" ON public.attendance_records
    FOR SELECT TO authenticated USING (tenant_id IN (SELECT tenant_id FROM public.memberships WHERE user_id = auth.uid()));
