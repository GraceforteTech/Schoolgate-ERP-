-- Finance Automation & Security Fixes

-- 1. Trigger for Updating Wallet Balances on Transaction Approval
CREATE OR REPLACE FUNCTION public.update_wallet_balance()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF (NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status != 'approved')) THEN
        -- Handle Credit
        IF NEW.type IN ('credit', 'refund') THEN
            UPDATE public.student_wallets
            SET balance = balance + NEW.amount,
                pending_balance = pending_balance - NEW.amount,
                updated_at = now()
            WHERE id = NEW.wallet_id;
        -- Handle Debit
        ELSIF NEW.type IN ('debit', 'fee_payment') THEN
            UPDATE public.student_wallets
            SET balance = balance - NEW.amount,
                updated_at = now()
            WHERE id = NEW.wallet_id;
        END IF;
    END IF;

    IF (NEW.status = 'pending' AND (OLD.status IS NULL OR OLD.status != 'pending')) THEN
        IF NEW.type = 'credit' THEN
            UPDATE public.student_wallets
            SET pending_balance = pending_balance + NEW.amount
            WHERE id = NEW.wallet_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_transaction_status_change ON public.transactions;
CREATE TRIGGER on_transaction_status_change
    AFTER UPDATE ON public.transactions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_wallet_balance();

-- 2. Finance Policies
DROP POLICY IF EXISTS "Bursars manage transactions" ON public.transactions;
CREATE POLICY "Bursars manage transactions" ON public.transactions FOR ALL TO authenticated USING (public.has_role(auth.uid(), tenant_id, 'bursar') OR public.can_admin_tenant(auth.uid(), tenant_id));

DROP POLICY IF EXISTS "Parents view children fees" ON public.student_fees;
CREATE POLICY "Parents view children fees" ON public.student_fees FOR SELECT TO authenticated USING (public.is_member(auth.uid(), tenant_id));

-- 3. Security Hardening
REVOKE EXECUTE ON FUNCTION public.update_wallet_balance() FROM PUBLIC, anon, authenticated;
-- Verify if redeem_report_pin exists before revoking (idempotent way)
DO $$ 
BEGIN
    IF EXISTS (SELECT 1 FROM pg_proc JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid WHERE proname = 'redeem_report_pin' AND nspname = 'public') THEN
        REVOKE EXECUTE ON FUNCTION public.redeem_report_pin(text, uuid) FROM PUBLIC, anon, authenticated;
    END IF;
END $$;
