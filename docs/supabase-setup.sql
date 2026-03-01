-- =============================================================================
-- Visual Art AI — Supabase Setup SQL
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Orden: 1) Extensiones → 2) Trigger → 3) RLS
-- =============================================================================


-- =============================================================================
-- 0. EXTENSIONES
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =============================================================================
-- 1. TRIGGER: Auto-crear perfil al registrarse
-- =============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, is_active)
  VALUES (
    NEW.id,
    NEW.email,
    'student',
    true
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();


-- =============================================================================
-- 2. HABILITAR RLS
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.changelog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;


-- =============================================================================
-- 3. POLICIES — PROFILES
-- =============================================================================

DROP POLICY IF EXISTS "profiles_self_read" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_all" ON public.profiles;

CREATE POLICY "profiles_self_read" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles_self_update" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_admin_all" ON public.profiles
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );


-- =============================================================================
-- 4. POLICIES — COURSES
-- =============================================================================

DROP POLICY IF EXISTS "courses_public_read" ON public.courses;
DROP POLICY IF EXISTS "courses_admin_all" ON public.courses;

CREATE POLICY "courses_public_read" ON public.courses
  FOR SELECT USING (status = 'published');

CREATE POLICY "courses_admin_all" ON public.courses
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );


-- =============================================================================
-- 5. POLICIES — MODULES
-- =============================================================================

DROP POLICY IF EXISTS "modules_public_read" ON public.modules;
DROP POLICY IF EXISTS "modules_admin_all" ON public.modules;

CREATE POLICY "modules_public_read" ON public.modules
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.courses c
      WHERE c.id = modules.course_id AND c.status = 'published'
    )
  );

CREATE POLICY "modules_admin_all" ON public.modules
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );


-- =============================================================================
-- 6. POLICIES — LESSONS
-- =============================================================================

DROP POLICY IF EXISTS "lessons_enrolled_or_preview" ON public.lessons;
DROP POLICY IF EXISTS "lessons_admin_all" ON public.lessons;

CREATE POLICY "lessons_enrolled_or_preview" ON public.lessons
  FOR SELECT USING (
    -- Preview gratuita
    (is_free_preview = true AND status = 'published')
    OR
    -- Inscrito activo en el curso
    EXISTS (
      SELECT 1 FROM public.enrollments e
      JOIN public.modules m ON m.id = lessons.module_id
      WHERE e.user_id = auth.uid()
        AND e.course_id = m.course_id
        AND e.status = 'active'
    )
    OR
    -- Curso completamente gratuito
    EXISTS (
      SELECT 1 FROM public.modules m
      JOIN public.courses c ON c.id = m.course_id
      WHERE m.id = lessons.module_id
        AND c.is_free = true
        AND c.status = 'published'
    )
  );

CREATE POLICY "lessons_admin_all" ON public.lessons
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );


-- =============================================================================
-- 7. POLICIES — RESOURCES
-- =============================================================================

DROP POLICY IF EXISTS "resources_free_public" ON public.resources;
DROP POLICY IF EXISTS "resources_enrolled_users" ON public.resources;
DROP POLICY IF EXISTS "resources_admin_all" ON public.resources;

CREATE POLICY "resources_free_public" ON public.resources
  FOR SELECT USING (is_free = true AND status = 'published');

CREATE POLICY "resources_enrolled_users" ON public.resources
  FOR SELECT USING (
    is_free = false
    AND status = 'published'
    AND EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "resources_admin_all" ON public.resources
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );


-- =============================================================================
-- 8. POLICIES — PURCHASES
-- =============================================================================

DROP POLICY IF EXISTS "purchases_self_read" ON public.purchases;
DROP POLICY IF EXISTS "purchases_admin_all" ON public.purchases;

CREATE POLICY "purchases_self_read" ON public.purchases
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "purchases_admin_all" ON public.purchases
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );


-- =============================================================================
-- 9. POLICIES — ENROLLMENTS
-- =============================================================================

DROP POLICY IF EXISTS "enrollments_self_read" ON public.enrollments;
DROP POLICY IF EXISTS "enrollments_admin_all" ON public.enrollments;

CREATE POLICY "enrollments_self_read" ON public.enrollments
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "enrollments_admin_all" ON public.enrollments
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );


-- =============================================================================
-- 10. POLICIES — PROGRESS
-- =============================================================================

DROP POLICY IF EXISTS "progress_self" ON public.progress;

CREATE POLICY "progress_self" ON public.progress
  FOR ALL USING (user_id = auth.uid());


-- =============================================================================
-- 11. POLICIES — CHANGELOG
-- =============================================================================

DROP POLICY IF EXISTS "changelog_public_read" ON public.changelog;
DROP POLICY IF EXISTS "changelog_admin_all" ON public.changelog;

CREATE POLICY "changelog_public_read" ON public.changelog
  FOR SELECT USING (true);

CREATE POLICY "changelog_admin_all" ON public.changelog
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );


-- =============================================================================
-- 12. POLICIES — WEBHOOK LOGS
-- =============================================================================

DROP POLICY IF EXISTS "webhook_logs_admin_only" ON public.webhook_logs;

CREATE POLICY "webhook_logs_admin_only" ON public.webhook_logs
  FOR ALL USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );


-- =============================================================================
-- 13. STORAGE BUCKETS
-- =============================================================================

-- Ejecutar en Supabase Dashboard > Storage > New Bucket
-- O via API si prefieres

INSERT INTO storage.buckets (id, name, public)
VALUES ('course-thumbnails', 'course-thumbnails', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('resources', 'resources', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies para buckets públicos
CREATE POLICY "course_thumbnails_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course-thumbnails');

CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- Upload permitido solo a admin/mentor
CREATE POLICY "course_thumbnails_admin_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'course-thumbnails'
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );

CREATE POLICY "avatars_user_upload"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid() IS NOT NULL
    AND name LIKE auth.uid()::text || '/%'
  );

-- Resources: solo usuarios con enrollment activo
CREATE POLICY "resources_enrolled_download"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'resources'
    AND EXISTS (
      SELECT 1 FROM public.enrollments
      WHERE user_id = auth.uid() AND status = 'active'
    )
  );

CREATE POLICY "resources_admin_all"
  ON storage.objects FOR ALL
  USING (
    bucket_id = 'resources'
    AND (SELECT role FROM public.profiles WHERE id = auth.uid()) IN ('admin', 'mentor')
  );


-- =============================================================================
-- 14. VERIFICACIÓN
-- =============================================================================

-- Verifica que el trigger está activo:
SELECT trigger_name, event_manipulation, event_object_table
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';

-- Verifica las policies de RLS:
SELECT schemaname, tablename, policyname, permissive, cmd
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Verifica los buckets:
SELECT id, name, public FROM storage.buckets;
