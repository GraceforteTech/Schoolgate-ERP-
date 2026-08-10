-- Secure security definer functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, uuid, app_role) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_member(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_member(uuid, uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.can_admin_tenant(uuid, uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.can_admin_tenant(uuid, uuid) TO authenticated;

REVOKE EXECUTE ON FUNCTION public.is_platform_admin(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_platform_admin(uuid) TO authenticated;

-- Add approve_expense function
CREATE OR REPLACE FUNCTION public.approve_expense(_expense_id uuid, _admin_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.expenses
  SET status = 'approved',
      approved_by = _admin_id,
      approved_at = now(),
      updated_at = now()
  WHERE id = _expense_id
    AND status = 'pending';
END;
$$;

GRANT EXECUTE ON FUNCTION public.approve_expense(uuid, uuid) TO authenticated;
