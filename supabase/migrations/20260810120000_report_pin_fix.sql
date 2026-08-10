-- Force schema cache refresh by creating a dummy table and dropping it
CREATE TABLE public.schema_refresh_dummy (id int);
DROP TABLE public.schema_refresh_dummy;

-- Ensure grants are complete
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

GRANT SELECT ON public.report_pins TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.report_pins TO authenticated;
