-- ROLES
CREATE TYPE public.app_role AS ENUM ('indicador','nomeado','jurado','admin','superadmin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','superadmin'));
$$;

CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Staff manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'superadmin')) WITH CHECK (public.has_role(auth.uid(),'superadmin'));

-- PROFILES
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT '',
  photo_url text,
  nationality text,
  country text,
  province text,
  city text,
  phone text,
  whatsapp text,
  email text,
  profession text,
  company text,
  position text,
  biography text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
CREATE POLICY "Update own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid() OR public.is_staff(auth.uid())) WITH CHECK (id = auth.uid() OR public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- NEW USER TRIGGER
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, whatsapp, nationality, country, province, city, profession, company, position)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name',''),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'whatsapp',
    NEW.raw_user_meta_data->>'nationality',
    NEW.raw_user_meta_data->>'country',
    NEW.raw_user_meta_data->>'province',
    NEW.raw_user_meta_data->>'city',
    NEW.raw_user_meta_data->>'profession',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'position'
  ) ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'indicador') ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- NOMINATIONS
CREATE TYPE public.nomination_status AS ENUM (
  'submetida','recebida','em_verificacao','em_analise','encaminhada_juri',
  'info_adicional','pre_selecionada','selecionada','nao_selecionada','arquivada'
);
CREATE TYPE public.nomination_type AS ENUM ('figura','empresa','instituicao','organizacao','projeto');

CREATE SEQUENCE public.nomination_code_seq;

CREATE TABLE public.nominations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomination_code text NOT NULL UNIQUE,
  indicator_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nominee_type public.nomination_type NOT NULL,
  nominee_name text NOT NULL,
  professional_name text,
  gender text,
  nationality text,
  country text,
  province text,
  city text,
  profession text,
  position text,
  company text,
  sector text,
  email text,
  phone text,
  linkedin text,
  instagram text,
  website text,
  biography text,
  justification text NOT NULL,
  achievements text,
  social_impact text,
  contribution_angola text,
  contribution_international text,
  projects text,
  previous_awards text,
  category text,
  status public.nomination_status NOT NULL DEFAULT 'submetida',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION public.generate_nomination_code()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.nomination_code IS NULL OR NEW.nomination_code = '' THEN
    NEW.nomination_code := 'PLA-IND-' || to_char(now(),'YYYY') || '-' || lpad(nextval('public.nomination_code_seq')::text, 6, '0');
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER nominations_code BEFORE INSERT ON public.nominations FOR EACH ROW EXECUTE FUNCTION public.generate_nomination_code();
CREATE TRIGGER nominations_updated_at BEFORE UPDATE ON public.nominations FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

GRANT SELECT, INSERT, UPDATE, DELETE ON public.nominations TO authenticated;
GRANT ALL ON public.nominations TO service_role;
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Indicator reads own nominations" ON public.nominations FOR SELECT TO authenticated USING (indicator_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Indicator creates nominations" ON public.nominations FOR INSERT TO authenticated WITH CHECK (indicator_id = auth.uid());
CREATE POLICY "Indicator updates own submitted" ON public.nominations FOR UPDATE TO authenticated USING ((indicator_id = auth.uid() AND status IN ('submetida','info_adicional')) OR public.is_staff(auth.uid())) WITH CHECK ((indicator_id = auth.uid() AND status IN ('submetida','info_adicional')) OR public.is_staff(auth.uid()));
CREATE POLICY "Staff delete nominations" ON public.nominations FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- FILES
CREATE TABLE public.nomination_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomination_id uuid NOT NULL REFERENCES public.nominations(id) ON DELETE CASCADE,
  file_type text NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.nomination_files TO authenticated;
GRANT ALL ON public.nomination_files TO service_role;
ALTER TABLE public.nomination_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own nomination files" ON public.nomination_files FOR SELECT TO authenticated USING (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.nominations n WHERE n.id = nomination_id AND n.indicator_id = auth.uid())
);
CREATE POLICY "Insert own nomination files" ON public.nomination_files FOR INSERT TO authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.nominations n WHERE n.id = nomination_id AND n.indicator_id = auth.uid())
);
CREATE POLICY "Staff update files" ON public.nomination_files FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Owner or staff delete files" ON public.nomination_files FOR DELETE TO authenticated USING (
  public.is_staff(auth.uid()) OR EXISTS (SELECT 1 FROM public.nominations n WHERE n.id = nomination_id AND n.indicator_id = auth.uid())
);

-- AUDIT
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  entity text NOT NULL,
  entity_id uuid,
  old_value text,
  new_value text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read audit" ON public.audit_logs FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "Authenticated write audit" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());