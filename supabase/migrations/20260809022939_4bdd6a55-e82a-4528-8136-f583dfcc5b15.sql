REVOKE EXECUTE ON FUNCTION public.is_platform_admin(UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, UUID, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_member(UUID, UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.current_tenant() FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.can_admin_tenant(UUID, UUID) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;