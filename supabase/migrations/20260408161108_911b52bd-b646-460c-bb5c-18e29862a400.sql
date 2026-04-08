
-- Create role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Allow authenticated users to read their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Drop old permissive write policies
DROP POLICY "Authenticated users can insert events" ON public.events;
DROP POLICY "Authenticated users can update events" ON public.events;
DROP POLICY "Authenticated users can delete events" ON public.events;
DROP POLICY "Authenticated users can insert characters" ON public.characters;
DROP POLICY "Authenticated users can update characters" ON public.characters;
DROP POLICY "Authenticated users can delete characters" ON public.characters;
DROP POLICY "Authenticated users can insert gallery" ON public.gallery;
DROP POLICY "Authenticated users can update gallery" ON public.gallery;
DROP POLICY "Authenticated users can delete gallery" ON public.gallery;
DROP POLICY "Authenticated users can insert site settings" ON public.site_settings;
DROP POLICY "Authenticated users can update site settings" ON public.site_settings;
DROP POLICY "Authenticated users can delete site settings" ON public.site_settings;

-- Admin-only write policies for events
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only write policies for characters
CREATE POLICY "Admins can insert characters" ON public.characters FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update characters" ON public.characters FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete characters" ON public.characters FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only write policies for gallery
CREATE POLICY "Admins can insert gallery" ON public.gallery FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update gallery" ON public.gallery FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete gallery" ON public.gallery FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Admin-only write policies for site_settings
CREATE POLICY "Admins can insert site settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site settings" ON public.site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
