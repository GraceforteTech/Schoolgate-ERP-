-- Create saved_audit_filters table
CREATE TABLE IF NOT EXISTS public.saved_audit_filters (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id uuid REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    filter_definition jsonb NOT NULL,
    is_default boolean DEFAULT false,
    is_shared boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- RLS for saved_audit_filters
ALTER TABLE public.saved_audit_filters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saved filters"
ON public.saved_audit_filters
FOR ALL
TO authenticated
USING (auth.uid() = user_id);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_audit_filters TO authenticated;
GRANT ALL ON public.saved_audit_filters TO service_role;

-- Update notifications table for archiving if not already present
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'notifications' AND column_name = 'archived_at') THEN
        ALTER TABLE public.notifications ADD COLUMN archived_at timestamptz;
    END IF;
END $$;

-- RLS for notifications updates
CREATE POLICY "Users can update their own notifications"
ON public.notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);
