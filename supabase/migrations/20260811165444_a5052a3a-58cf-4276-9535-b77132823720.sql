CREATE POLICY "Own nomination files read" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'nomination-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid())));
CREATE POLICY "Own nomination files insert" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'nomination-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Own nomination files update" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'nomination-files' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Own nomination files delete" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'nomination-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid())));