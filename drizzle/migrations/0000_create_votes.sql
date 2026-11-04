CREATE TABLE public.votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_slug text NOT NULL,
  nominee_slug text NOT NULL,
  voter_name text NOT NULL,
  voter_email text NOT NULL,
  voter_phone text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT votes_email_len CHECK (char_length(voter_email) BETWEEN 5 AND 255),
  CONSTRAINT votes_name_len CHECK (char_length(voter_name) BETWEEN 2 AND 120)
);
CREATE UNIQUE INDEX votes_unique_email ON public.votes (category_slug, lower(voter_email));
GRANT INSERT ON public.votes TO anon, authenticated;
GRANT SELECT ON public.votes TO authenticated;
GRANT ALL ON public.votes TO service_role;
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can vote" ON public.votes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read votes" ON public.votes FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));