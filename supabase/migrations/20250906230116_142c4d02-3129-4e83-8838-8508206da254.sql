-- Create app role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role app_role NOT NULL DEFAULT 'staff',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create user_roles table for role management
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- Create menu categories enum
CREATE TYPE public.menu_category AS ENUM ('breakfast', 'tajines', 'juices', 'pastries', 'daily_specials', 'coffee', 'desserts', 'sandwiches');

-- Create menu items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_arabic TEXT,
  description TEXT,
  description_arabic TEXT,
  category menu_category NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  is_special BOOLEAN DEFAULT FALSE,
  special_day TEXT, -- e.g., 'friday' for Couscous Friday
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery categories enum
CREATE TYPE public.gallery_category AS ENUM ('interior', 'dishes', 'events', 'drinks', 'exterior');

-- Create gallery table
CREATE TABLE public.gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category gallery_category NOT NULL,
  image_url TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reservation status enum
CREATE TYPE public.reservation_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  reservation_date DATE NOT NULL,
  reservation_time TIME NOT NULL,
  number_of_guests INTEGER NOT NULL CHECK (number_of_guests > 0),
  status reservation_status DEFAULT 'pending',
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create specials table
CREATE TABLE public.specials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_arabic TEXT,
  description TEXT,
  description_arabic TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  start_date DATE,
  end_date DATE,
  day_of_week TEXT, -- e.g., 'friday', 'wednesday'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE public.settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.specials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- Create function to check if user is admin or staff
CREATE OR REPLACE FUNCTION public.is_admin_or_staff(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin') OR public.has_role(_user_id, 'staff')
$$;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert profiles"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- RLS Policies for menu_items
CREATE POLICY "Everyone can view active menu items"
ON public.menu_items FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Admin and staff can view all menu items"
ON public.menu_items FOR SELECT
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin can manage all menu items"
ON public.menu_items FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff can update menu items"
ON public.menu_items FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'staff'));

-- RLS Policies for gallery_images
CREATE POLICY "Everyone can view active gallery images"
ON public.gallery_images FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Admin and staff can view all gallery images"
ON public.gallery_images FOR SELECT
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin can manage all gallery images"
ON public.gallery_images FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Staff can insert gallery images"
ON public.gallery_images FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'staff') AND auth.uid() = uploaded_by);

-- RLS Policies for reservations
CREATE POLICY "Admin and staff can view all reservations"
ON public.reservations FOR SELECT
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can manage reservations"
ON public.reservations FOR ALL
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Anyone can create reservations"
ON public.reservations FOR INSERT
WITH CHECK (TRUE);

-- RLS Policies for specials
CREATE POLICY "Everyone can view active specials"
ON public.specials FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Admin and staff can view all specials"
ON public.specials FOR SELECT
TO authenticated
USING (public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin can manage all specials"
ON public.specials FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- RLS Policies for settings
CREATE POLICY "Admin can manage all settings"
ON public.settings FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Everyone can view public settings"
ON public.settings FOR SELECT
USING (key IN ('opening_hours', 'contact_info', 'social_links'));

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    COALESCE((NEW.raw_user_meta_data ->> 'role')::app_role, 'staff')
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data ->> 'role')::app_role, 'staff')
  );
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_specials_updated_at
  BEFORE UPDATE ON public.specials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('menu-images', 'menu-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('specials', 'specials', true);

-- Create storage policies for menu images
CREATE POLICY "Menu images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'menu-images');

CREATE POLICY "Admin and staff can upload menu images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'menu-images' AND public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can update menu images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'menu-images' AND public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin can delete menu images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'menu-images' AND public.is_admin(auth.uid()));

-- Create storage policies for gallery
CREATE POLICY "Gallery images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery');

CREATE POLICY "Admin and staff can upload gallery images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'gallery' AND public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can update gallery images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'gallery' AND public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin can delete gallery images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'gallery' AND public.is_admin(auth.uid()));

-- Create storage policies for specials
CREATE POLICY "Specials images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'specials');

CREATE POLICY "Admin and staff can upload specials images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'specials' AND public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin and staff can update specials images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'specials' AND public.is_admin_or_staff(auth.uid()));

CREATE POLICY "Admin can delete specials images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'specials' AND public.is_admin(auth.uid()));

-- Insert default settings
INSERT INTO public.settings (key, value) VALUES
('opening_hours', '{"monday": "07:00-00:00", "tuesday": "07:00-00:00", "wednesday": "07:00-00:00", "thursday": "07:00-00:00", "friday": "07:00-00:00", "saturday": "07:00-00:00", "sunday": "07:00-00:00"}'),
('contact_info', '{"phone": "+212 XXX-XXXXXX", "email": "contact@riadice.ma", "address": "Rue Principale, Casablanca, Morocco"}'),
('social_links', '{"instagram": "https://instagram.com/riadice", "facebook": "https://facebook.com/riadice", "whatsapp": "+212XXXXXXXXX"}');

-- Insert sample menu items
INSERT INTO public.menu_items (name, name_arabic, description, description_arabic, category, price, is_special, special_day) VALUES
('Couscous Royal', 'كسكس ملكي', 'Traditional couscous with vegetables and meat', 'كسكس تقليدي بالخضار واللحم', 'daily_specials', 85.00, true, 'friday'),
('Rfissa', 'رفيسة', 'Traditional Moroccan dish with chicken and lentils', 'طبق مغربي تقليدي بالدجاج والعدس', 'daily_specials', 75.00, true, 'wednesday'),
('Pastilla au Poulet', 'بسطيلة بالدجاج', 'Sweet and savory pastry with chicken', 'معجنات حلوة ومالحة بالدجاج', 'pastries', 45.00, false, null),
('Harira', 'الحريرة', 'Traditional Moroccan soup', 'حساء مغربي تقليدي', 'daily_specials', 25.00, false, null),
('Café Latte', 'قهوة لاتيه', 'Espresso with steamed milk', 'إسبريسو مع الحليب المبخر', 'coffee', 20.00, false, null),
('Milkshake Chocolat', 'ميلك شيك شوكولاتة', 'Rich chocolate milkshake', 'ميلك شيك شوكولاتة غني', 'desserts', 30.00, false, null);

-- Insert sample gallery images (using placeholder URLs)
INSERT INTO public.gallery_images (title, category, image_url, is_featured) VALUES
('Restaurant Exterior', 'exterior', '/src/assets/hero-restaurant-exterior.jpg', true),
('Couscous Royal', 'dishes', '/src/assets/couscous-hero.jpg', true),
('Pastilla Special', 'dishes', '/src/assets/pastilla-hero.jpg', true),
('Chocolate Milkshake', 'drinks', '/src/assets/milkshake-hero.jpg', true);

-- Insert sample specials
INSERT INTO public.specials (title, title_arabic, description, description_arabic, day_of_week, is_active) VALUES
('Couscous Friday', 'جمعة الكسكس', 'Every Friday, enjoy our special Couscous Royal', 'كل يوم جمعة، استمتع بكسكسنا الملكي الخاص', 'friday', true),
('Rfissa Wednesday', 'أربعاء الرفيسة', 'Traditional Rfissa every Wednesday', 'رفيسة تقليدية كل يوم أربعاء', 'wednesday', true);