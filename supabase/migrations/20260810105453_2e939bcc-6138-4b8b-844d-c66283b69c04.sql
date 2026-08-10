-- 1. Drop dependent policies first
DROP POLICY IF EXISTS "Platform admins can delete tenants" ON public.tenants;
DROP POLICY IF EXISTS "Platform admins can insert tenants" ON public.tenants;
DROP POLICY IF EXISTS "Owners and admins can update their tenant" ON public.tenants;
DROP POLICY IF EXISTS "Members can view their tenant" ON public.tenants;
DROP POLICY IF EXISTS "Tenant admins can manage campuses" ON public.campuses;
DROP POLICY IF EXISTS "Members can view campuses" ON public.campuses;
DROP POLICY IF EXISTS "Tenant admins can manage memberships" ON public.memberships;
DROP POLICY IF EXISTS "Tenant admins can view tenant memberships" ON public.memberships;
DROP POLICY IF EXISTS "Users can view own memberships" ON public.memberships;
DROP POLICY IF EXISTS "Tenant admins can view tenant roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;

-- 2. Drop functions
DROP FUNCTION IF EXISTS public.has_role(uuid, public.app_role);
DROP FUNCTION IF EXISTS public.has_role(uuid, uuid, public.app_role);
DROP FUNCTION IF EXISTS public.is_member(uuid, uuid);
DROP FUNCTION IF EXISTS public.current_tenant();
DROP FUNCTION IF EXISTS public.is_platform_admin(uuid);
DROP FUNCTION IF EXISTS public.can_admin_tenant(uuid, uuid);

-- 3. Re-create Helper Functions (Security Definer)

CREATE OR REPLACE FUNCTION public.is_platform_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'platform_admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_member(_user_id uuid, _tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.memberships
    WHERE tenant_id = _tenant_id AND user_id = _user_id AND is_active = true
  );
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _tenant_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND (tenant_id = _tenant_id OR tenant_id IS NULL) AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.can_admin_tenant(_user_id uuid, _tenant_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id 
    AND (tenant_id = _tenant_id OR tenant_id IS NULL)
    AND role IN ('school_owner', 'school_admin', 'platform_admin')
  );
$$;

-- 4. Re-create Policies

-- Tenants
CREATE POLICY "Tenants visibility" ON public.tenants
FOR SELECT TO authenticated
USING (public.is_platform_admin(auth.uid()) OR public.is_member(auth.uid(), id));

CREATE POLICY "Platform admins manage tenants" ON public.tenants
FOR ALL TO authenticated
USING (public.is_platform_admin(auth.uid()));

CREATE POLICY "Owners update tenants" ON public.tenants
FOR UPDATE TO authenticated
USING (public.can_admin_tenant(auth.uid(), id));

-- Campuses
CREATE POLICY "Members view campuses" ON public.campuses
FOR SELECT TO authenticated
USING (public.is_member(auth.uid(), tenant_id));

CREATE POLICY "Admins manage campuses" ON public.campuses
FOR ALL TO authenticated
USING (public.can_admin_tenant(auth.uid(), tenant_id));

-- Memberships
CREATE POLICY "Users view own memberships" ON public.memberships
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins view memberships" ON public.memberships
FOR SELECT TO authenticated
USING (public.can_admin_tenant(auth.uid(), tenant_id));

CREATE POLICY "Admins manage memberships" ON public.memberships
FOR ALL TO authenticated
USING (public.can_admin_tenant(auth.uid(), tenant_id));

-- User Roles
CREATE POLICY "Users view own roles" ON public.user_roles
FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins view roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.can_admin_tenant(auth.uid(), tenant_id) OR public.is_platform_admin(auth.uid()));
