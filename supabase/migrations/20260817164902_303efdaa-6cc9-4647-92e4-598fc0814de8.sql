CREATE TABLE public.nomination_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomination_id uuid NOT NULL REFERENCES public.nominations(id) ON DELETE CASCADE,
  actor_id uuid,
  event_type text NOT NULL,
  field text,
  old_value text,
  new_value text,
  file_id uuid,
  file_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX nomination_events_nomination_idx ON public.nomination_events (nomination_id, created_at DESC);
CREATE INDEX nomination_events_created_idx ON public.nomination_events (created_at DESC);

GRANT SELECT ON public.nomination_events TO authenticated;
GRANT ALL ON public.nomination_events TO service_role;

ALTER TABLE public.nomination_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Read own or staff nomination events"
ON public.nomination_events FOR SELECT TO authenticated
USING (
  public.is_staff(auth.uid())
  OR EXISTS (SELECT 1 FROM public.nominations n WHERE n.id = nomination_events.nomination_id AND n.indicator_id = auth.uid())
);

CREATE OR REPLACE FUNCTION public.log_nomination_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  f text;
  old_v text;
  new_v text;
  fields text[] := ARRAY['nominee_name','professional_name','category','nominee_type','email','phone','justification','biography','achievements','social_impact','contribution_angola','contribution_international','projects','previous_awards','company','position','sector','city','province','country'];
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, new_value)
    VALUES (NEW.id, NEW.indicator_id, 'criada', NEW.status::text);
    RETURN NEW;
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, field, old_value, new_value)
    VALUES (NEW.id, auth.uid(), 'estado', 'status', OLD.status::text, NEW.status::text);
  END IF;

  FOREACH f IN ARRAY fields LOOP
    EXECUTE format('SELECT ($1).%I::text, ($2).%I::text', f, f) INTO old_v, new_v USING OLD, NEW;
    IF old_v IS DISTINCT FROM new_v THEN
      INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, field, old_value, new_value)
      VALUES (NEW.id, auth.uid(), 'edicao', f, old_v, new_v);
    END IF;
  END LOOP;

  IF NEW.admin_notes IS DISTINCT FROM OLD.admin_notes THEN
    INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, field)
    VALUES (NEW.id, auth.uid(), 'nota_interna', 'admin_notes');
  END IF;

  RETURN NEW;
END; $$;

CREATE TRIGGER nominations_event_log
AFTER INSERT OR UPDATE ON public.nominations
FOR EACH ROW EXECUTE FUNCTION public.log_nomination_event();

CREATE OR REPLACE FUNCTION public.log_nomination_file_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, field, new_value, file_id, file_name)
    VALUES (NEW.nomination_id, auth.uid(), 'documento_adicionado', NEW.file_type, NEW.status, NEW.id, NEW.file_name);
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    IF NEW.status IS DISTINCT FROM OLD.status THEN
      INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, field, old_value, new_value, file_id, file_name)
      VALUES (NEW.nomination_id, auth.uid(), 'documento_estado', NEW.file_type, OLD.status, NEW.status, NEW.id, NEW.file_name);
    END IF;
    RETURN NEW;
  ELSE
    INSERT INTO public.nomination_events (nomination_id, actor_id, event_type, field, old_value, file_id, file_name)
    VALUES (OLD.nomination_id, auth.uid(), 'documento_removido', OLD.file_type, OLD.status, OLD.id, OLD.file_name);
    RETURN OLD;
  END IF;
END; $$;

CREATE TRIGGER nomination_files_event_log
AFTER INSERT OR UPDATE OR DELETE ON public.nomination_files
FOR EACH ROW EXECUTE FUNCTION public.log_nomination_file_event();