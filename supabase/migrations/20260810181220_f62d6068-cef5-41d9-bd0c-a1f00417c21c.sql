-- Finance, Wallets & Expense Management Migration

-- 1. Enums
DO $$ BEGIN
    CREATE TYPE public.transaction_type AS ENUM ('credit', 'debit', 'fee_payment', 'adjustment', 'refund');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.transaction_status AS ENUM ('pending', 'approved', 'rejected', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.payment_method AS ENUM ('card', 'bank_transfer', 'cash', 'cheque', 'wallet');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE public.expense_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. Finance Tables

-- Fee Types
CREATE TABLE IF NOT EXISTS public.fee_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    category text,
    is_active boolean DEFAULT true,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(tenant_id, name)
);

-- Student Wallets
CREATE TABLE IF NOT EXISTS public.student_wallets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id uuid NOT NULL,
    parent_id uuid REFERENCES auth.users(id),
    balance numeric(15,2) DEFAULT 0.00,
    pending_balance numeric(15,2) DEFAULT 0.00,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(tenant_id, student_id)
);

-- Transactions
CREATE TABLE IF NOT EXISTS public.transactions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id uuid NOT NULL,
    wallet_id uuid REFERENCES public.student_wallets(id),
    amount numeric(15,2) NOT NULL,
    type public.transaction_type NOT NULL,
    status public.transaction_status DEFAULT 'pending',
    method public.payment_method NOT NULL,
    reference text,
    description text,
    academic_session text,
    term text,
    metadata jsonb,
    created_by uuid REFERENCES auth.users(id),
    approved_by uuid REFERENCES auth.users(id),
    rejected_by uuid REFERENCES auth.users(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    approved_at timestamptz,
    rejected_at timestamptz
);

-- Student Fees Ledger
CREATE TABLE IF NOT EXISTS public.student_fees (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    student_id uuid NOT NULL,
    fee_type_id uuid REFERENCES public.fee_types(id),
    academic_session text NOT NULL,
    term text NOT NULL,
    class_id text NOT NULL,
    amount_due numeric(15,2) NOT NULL,
    amount_paid numeric(15,2) DEFAULT 0.00,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    UNIQUE(tenant_id, student_id, fee_type_id, academic_session, term)
);

-- Expenses
CREATE TABLE IF NOT EXISTS public.expenses (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
    category text NOT NULL,
    amount numeric(15,2) NOT NULL,
    description text,
    vendor_payee text,
    date timestamptz DEFAULT now(),
    method public.payment_method,
    reference text,
    status public.expense_status DEFAULT 'pending',
    attachment_url text,
    created_by uuid REFERENCES auth.users(id),
    approved_by uuid REFERENCES auth.users(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    approved_at timestamptz
);

-- 3. RLS and Grants
ALTER TABLE public.fee_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_fees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.fee_types TO authenticated;
GRANT ALL ON public.fee_types TO service_role;
GRANT SELECT ON public.student_wallets TO authenticated;
GRANT ALL ON public.student_wallets TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.student_fees TO authenticated;
GRANT ALL ON public.student_fees TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.expenses TO authenticated;
GRANT ALL ON public.expenses TO service_role;

-- 4. Policies
DROP POLICY IF EXISTS "Tenants view fee types" ON public.fee_types;
CREATE POLICY "Tenants view fee types" ON public.fee_types FOR SELECT TO authenticated USING (public.is_member(auth.uid(), tenant_id));
DROP POLICY IF EXISTS "Admins manage fee types" ON public.fee_types;
CREATE POLICY "Admins manage fee types" ON public.fee_types FOR ALL TO authenticated USING (public.can_admin_tenant(auth.uid(), tenant_id));

DROP POLICY IF EXISTS "Parents view own children wallets" ON public.student_wallets;
CREATE POLICY "Parents view own children wallets" ON public.student_wallets FOR SELECT TO authenticated USING (parent_id = auth.uid() OR public.can_admin_tenant(auth.uid(), tenant_id));

DROP POLICY IF EXISTS "Users view own transactions" ON public.transactions;
CREATE POLICY "Users view own transactions" ON public.transactions FOR SELECT TO authenticated USING (created_by = auth.uid() OR public.can_admin_tenant(auth.uid(), tenant_id));

DROP POLICY IF EXISTS "Admins manage expenses" ON public.expenses;
CREATE POLICY "Admins manage expenses" ON public.expenses FOR ALL TO authenticated USING (public.can_admin_tenant(auth.uid(), tenant_id) OR public.has_role(auth.uid(), tenant_id, 'bursar'));
