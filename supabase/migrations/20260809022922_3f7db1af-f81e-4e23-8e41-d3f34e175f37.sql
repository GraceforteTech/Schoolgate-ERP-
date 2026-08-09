-- ============ ENUMS ============
CREATE TYPE public.tenant_status AS ENUM ('trial', 'active', 'suspended', 'cancelled');
CREATE TYPE public.app_role AS ENUM (
  'platform_admin', 'school_owner', 'school_admin', 'bursar',
  'principal', 'teacher', 'staff', 'parent', 'student'
);

-- ============ TENANTS ============
CREATE TABLE public.tenants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  status public.tenant_status NOT NULL DEFAULT 'trial',
  plan TEXT NOT NULL DEFAULT 'starter',
  logo_url TEXT,
  primary_color TEXT NOT NULL DEFAULT '#0B6E3C',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tenants TO authenticated;
GRANT ALL ON public.tenants TO service_role;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- ============ CAMPUSES ============
CREATE TABLE public.campuses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT,
  address TEXT,
  is_primary BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, name)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.campuses TO authenticated;
GRANT ALL ON public.campuses TO service_role;
ALTER TABLE public.campuses ENABLE ROW LEVEL SECURITY;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID NOT NULL PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============ MEMBERSHIPS ============
CREATE TABLE public.memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  campus_id UUID REFERENCES public.campuses(id) ON DELETE SET NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tenant_id)
);
CREATE INDEX idx_memberships_user ON public.memberships(user_id);
CREATE INDEX idx_memberships_tenant ON public.memberships(tenant_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.memberships TO authenticated;
GRANT ALL ON public.memberships TO service_role;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tenant_id, role)
);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_tenant ON public.user_roles(tenant_id);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============ HELPER FUNCTIONS (SECURITY DEFINER) ============
CREATE OR REPLACE FUNCTION public.is_platform_admin(_user_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = 'platform_admin'
  )
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _tenant_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND (tenant_id = _tenant_id OR tenant_id IS NULL)
  ) OR public.is_platform_admin(_user_id)
$$;

CREATE OR REPLACE FUNCTION public.is_member(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.memberships
    WHERE user_id = _user_id AND tenant_id = _tenant_id AND is_active
  ) OR public.is_platform_admin(_user_id)
$$;

CREATE OR REPLACE FUNCTION public.current_tenant()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT tenant_id FROM public.memberships
  WHERE user_id = auth.uid() AND is_active
  ORDER BY is_default DESC, created_at ASC
  LIMIT 1
$$;

CREATE OR REPLACE FUNCTION public.can_admin_tenant(_user_id UUID, _tenant_id UUID)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(_user_id, _tenant_id, 'school_owner')
      OR public.has_role(_user_id, _tenant_id, 'school_admin')
$$;

GRANT EXECUTE ON FUNCTION public.is_platform_admin(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, UUID, public.app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_member(UUID, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.current_tenant() TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_admin_tenant(UUID, UUID) TO authenticated;

-- ============ POLICIES ============
-- tenants
CREATE POLICY "Members can view their tenant" ON public.tenants
FOR SELECT TO authenticated USING (public.is_member(auth.uid(), id));
CREATE POLICY "Owners and admins can update their tenant" ON public.tenants
FOR UPDATE TO authenticated USING (public.can_admin_tenant(auth.uid(), id))
WITH CHECK (public.can_admin_tenant(auth.uid(), id));
CREATE POLICY "Platform admins can insert tenants" ON public.tenants
FOR INSERT TO authenticated WITH CHECK (public.is_platform_admin(auth.uid()));
CREATE POLICY "Platform admins can delete tenants" ON public.tenants
FOR DELETE TO authenticated USING (public.is_platform_admin(auth.uid()));

-- campuses
CREATE POLICY "Members can view campuses" ON public.campuses
FOR SELECT TO authenticated USING (public.is_member(auth.uid(), tenant_id));
CREATE POLICY "Tenant admins can manage campuses" ON public.campuses
FOR ALL TO authenticated USING (public.can_admin_tenant(auth.uid(), tenant_id))
WITH CHECK (public.can_admin_tenant(auth.uid(), tenant_id));

-- profiles
CREATE POLICY "Users can view own profile" ON public.profiles
FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- memberships
CREATE POLICY "Users can view own memberships" ON public.memberships
FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Tenant admins can view tenant memberships" ON public.memberships
FOR SELECT TO authenticated USING (public.can_admin_tenant(auth.uid(), tenant_id));
CREATE POLICY "Tenant admins can manage memberships" ON public.memberships
FOR ALL TO authenticated USING (public.can_admin_tenant(auth.uid(), tenant_id))
WITH CHECK (public.can_admin_tenant(auth.uid(), tenant_id));

-- user_roles
CREATE POLICY "Users can view own roles" ON public.user_roles
FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Tenant admins can view tenant roles" ON public.user_roles
FOR SELECT TO authenticated USING (tenant_id IS NOT NULL AND public.can_admin_tenant(auth.uid(), tenant_id));

-- ============ UPDATED_AT TRIGGERS ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_campuses_updated_at BEFORE UPDATE ON public.campuses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_memberships_updated_at BEFORE UPDATE ON public.memberships
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();