-- 1. Refine student_fees RLS: Parents should only see fees for their children
DROP POLICY IF EXISTS "Parents view children fees" ON public.student_fees;
CREATE POLICY "Parents view children fees" ON public.student_fees
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE students.id = student_fees.student_id 
    AND students.parent_id = auth.uid()
  ) OR public.can_admin_tenant(auth.uid(), tenant_id)
);

-- 2. Refine student_wallets RLS
DROP POLICY IF EXISTS "Parents view own children wallets" ON public.student_wallets;
CREATE POLICY "Parents view own children wallets" ON public.student_wallets
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE students.id = student_wallets.student_id 
    AND students.parent_id = auth.uid()
  ) OR public.can_admin_tenant(auth.uid(), tenant_id)
);

-- 3. Refine transactions RLS
DROP POLICY IF EXISTS "Users view own transactions" ON public.transactions;
CREATE POLICY "Users view own transactions" ON public.transactions
FOR SELECT TO authenticated
USING (
  created_by = auth.uid() OR 
  student_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.students 
    WHERE students.id = transactions.student_id 
    AND students.parent_id = auth.uid()
  ) OR
  public.can_admin_tenant(auth.uid(), tenant_id)
);

-- 4. Add missing grant for student_fees status updates
GRANT UPDATE ON public.student_fees TO authenticated;
GRANT UPDATE ON public.transactions TO authenticated;
GRANT UPDATE ON public.student_wallets TO authenticated;

-- 5. Add Expense Approval status and person
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS approved_by uuid REFERENCES auth.users(id);
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS approved_at timestamp with time zone;
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS rejected_by uuid REFERENCES auth.users(id);
ALTER TABLE public.expenses ADD COLUMN IF NOT EXISTS rejected_at timestamp with time zone;

-- 6. Add transaction fields for specific fee type mapping
ALTER TABLE public.transactions ADD COLUMN IF NOT EXISTS fee_type_id uuid REFERENCES public.fee_types(id);

-- 7. Grant access to expenses for relevant roles
GRANT SELECT, INSERT, UPDATE ON public.expenses TO authenticated;
GRANT ALL ON public.expenses TO service_role;
