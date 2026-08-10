-- Enhance fee_types table with needed fields for registry management
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS academic_session text;
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS term text;
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS applicable_classes text[];
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS amount numeric(15,2) DEFAULT 0.00;
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS is_mandatory boolean DEFAULT true;
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS is_recurring boolean DEFAULT true;
ALTER TABLE public.fee_types ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES auth.users(id);
