-- Sri Lakshmi Ladies PG - Full Migration
-- Run this ENTIRE script in Supabase SQL Editor

-- 1. Drop old table (DELETES existing data)
DROP TABLE IF EXISTS public.applicants;

-- 2. Create fresh applicants table with all required columns
CREATE TABLE public.applicants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    admission_id TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    parent_name TEXT NOT NULL,
    parent_phone TEXT NOT NULL,
    address TEXT NOT NULL,
    college_name TEXT NOT NULL,
    course_name TEXT NOT NULL,
    room_type TEXT NOT NULL,
    stay_duration TEXT NOT NULL,
    id_proof_url TEXT,
    photo_url TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 3. RLS
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon inserts" ON public.applicants
    FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Admin full access" ON public.applicants
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_applicants_status ON public.applicants(status);
CREATE INDEX IF NOT EXISTS idx_applicants_created_at ON public.applicants(created_at DESC);

-- 5. Other tables (safe — IF NOT EXISTS)
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.gallery_images (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.faq_entries (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. RLS for other tables
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faq_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon inserts' AND tablename = 'contact_requests') THEN
    CREATE POLICY "Allow anon inserts" ON public.contact_requests FOR INSERT TO anon WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read' AND tablename = 'gallery_images') THEN
    CREATE POLICY "Allow public read" ON public.gallery_images FOR SELECT TO anon USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read' AND tablename = 'faq_entries') THEN
    CREATE POLICY "Allow public read" ON public.faq_entries FOR SELECT TO anon USING (true);
  END IF;
END $$;

-- 7. Storage
INSERT INTO storage.buckets (id, name, public)
VALUES ('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon uploads') THEN
    CREATE POLICY "Allow anon uploads" ON storage.objects FOR INSERT TO anon WITH CHECK (bucket_id = 'documents');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow anon reads') THEN
    CREATE POLICY "Allow anon reads" ON storage.objects FOR SELECT TO anon USING (bucket_id = 'documents');
  END IF;
END $$;
