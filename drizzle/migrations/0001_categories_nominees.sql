CREATE TABLE public.categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT ALL ON public.categories TO service_role;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read categories" ON public.categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage categories" ON public.categories FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE TABLE public.nominees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  category_id uuid NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  description text,
  company text,
  image_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.nominees TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.nominees TO authenticated;
GRANT ALL ON public.nominees TO service_role;
ALTER TABLE public.nominees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read nominees" ON public.nominees FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Staff manage nominees" ON public.nominees FOR ALL TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

CREATE POLICY "Public read nominee images" ON storage.objects FOR SELECT USING (bucket_id = 'nominee-images');
CREATE POLICY "Staff upload nominee images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'nominee-images' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff update nominee images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'nominee-images' AND public.is_staff(auth.uid()));
CREATE POLICY "Staff delete nominee images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'nominee-images' AND public.is_staff(auth.uid()));