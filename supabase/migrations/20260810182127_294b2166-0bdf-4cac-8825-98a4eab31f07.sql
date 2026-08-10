-- Add payment status and reference fields
ALTER TABLE public.student_fees ADD COLUMN IF NOT EXISTS status text DEFAULT 'unpaid';

-- Add virtual account for students
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS virtual_account_number text;
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS virtual_account_bank text;

-- Add comment for unique reference
COMMENT ON COLUMN public.transactions.reference IS 'Unique reference to prevent duplicate posting';

-- Policy for students to view their own fees if they have an account
DROP POLICY IF EXISTS "Students view own fees" ON public.student_fees;
CREATE POLICY "Students view own fees" ON public.student_fees FOR SELECT TO authenticated USING (student_id = auth.uid());