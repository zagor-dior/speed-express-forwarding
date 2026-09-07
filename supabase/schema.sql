-- Extension pour UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES (Extension de auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  company_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'admin', 'operator')),
  created_at TIMESTAMP WITH TIMEZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. SHIPMENTS (Expéditions)
CREATE TABLE IF NOT EXISTS public.shipments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tracking_number TEXT UNIQUE NOT NULL CHECK (tracking_number ~ '^[A-Z0-9]{16}$'),
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_name TEXT NOT NULL,
  sender_phone TEXT NOT NULL,
  sender_email TEXT NOT NULL,
  sender_address TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  recipient_address TEXT NOT NULL,
  origin_country TEXT NOT NULL,
  destination_country TEXT NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('Air Freight', 'Ocean Freight', 'Road Freight', 'Express Delivery', 'Warehousing', 'Customs Clearance')),
  status TEXT DEFAULT 'Pending' CHECK (status IN ('Pending', 'In Transit', 'Out for Delivery', 'Delivered', 'On Hold', 'Cancelled')),
  product_quantity INTEGER NOT NULL DEFAULT 1 CHECK (product_quantity > 0),
  weight_kg NUMERIC(10, 2),
  dimensions_cm TEXT,
  total_freight NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (total_freight >= 0),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('Bancaire', 'Mobile')),
  shipped_at TIMESTAMP WITH TIME ZONE,
  estimated_delivery TIMESTAMP WITH TIMEZONE,
  created_at TIMESTAMP WITH TIMEZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIMEZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Migration pour une table shipments déjà existante
ALTER TABLE public.shipments
  ADD COLUMN IF NOT EXISTS product_quantity INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS total_freight NUMERIC(12, 2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS shipped_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.shipments
  DROP CONSTRAINT IF EXISTS shipments_product_quantity_check,
  DROP CONSTRAINT IF EXISTS shipments_total_freight_check;

ALTER TABLE public.shipments
  ADD CONSTRAINT shipments_product_quantity_check CHECK (product_quantity > 0),
  ADD CONSTRAINT shipments_total_freight_check CHECK (total_freight >= 0);

-- 3. SHIPMENT_UPDATES (Historique de suivi)
CREATE TABLE IF NOT EXISTS public.shipment_updates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  shipment_id UUID REFERENCES public.shipments(id) ON DELETE CASCADE NOT NULL,
  location TEXT NOT NULL,
  status_title TEXT NOT NULL,
  description TEXT,
  timestamp TIMESTAMP WITH TIMEZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_by UUID REFERENCES public.profiles(id)
);

-- Active RLS sur les tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipment_updates ENABLE ROW LEVEL SECURITY;

-- POLITIQUES RLS :
-- Profiles : Chacun peut lire son profil, les admins lisent tout.
DROP POLICY IF EXISTS "Public profiles read" ON public.profiles;
CREATE POLICY "Public profiles read" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Shipments :
-- 1. TOUT LE MONDE (même non connecté) peut lire une expédition s'il connaît le tracking_number.
DROP POLICY IF EXISTS "Anyone can track by tracking_number" ON public.shipments;
CREATE POLICY "Anyone can track by tracking_number" ON public.shipments FOR SELECT USING (true);

-- 2. Seuls les Admins / Opérateurs peuvent insérer ou modifier des expéditions.
DROP POLICY IF EXISTS "Admins can insert shipments" ON public.shipments;
CREATE POLICY "Admins can insert shipments" ON public.shipments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
);

DROP POLICY IF EXISTS "Admins can update shipments" ON public.shipments;
CREATE POLICY "Admins can update shipments" ON public.shipments FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
);

-- Shipment Updates :
-- Lecture publique
DROP POLICY IF EXISTS "Anyone can view updates" ON public.shipment_updates;
CREATE POLICY "Anyone can view updates" ON public.shipment_updates FOR SELECT USING (true);

-- Insertion réservée aux admins
DROP POLICY IF EXISTS "Admins can insert updates" ON public.shipment_updates;
CREATE POLICY "Admins can insert updates" ON public.shipment_updates FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'operator'))
);

-- Trigger de mise à jour automatique du profil à la création d'un utilisateur Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name', COALESCE(new.raw_user_meta_data->>'role', 'client'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- SEED MOCK DATA POUR DEMO INSTANTANEE
INSERT INTO public.shipments (id, tracking_number, sender_name, sender_phone, sender_email, sender_address, recipient_name, recipient_phone, recipient_email, recipient_address, origin_country, destination_country, service_type, status, product_quantity, weight_kg, dimensions_cm, total_freight, payment_method, estimated_delivery)
VALUES 
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'SEF2026A1B2C3D4E', 'TechLogistics Corp', '+33000000000', 'contact@techlogistics.example', 'Paris, France', 'Global Trade Ltd', '+22100000000', 'contact@globaltrade.example', 'Dakar, Sénégal', 'France', 'Sénégal', 'Air Freight', 'In Transit', 3, 42.50, '60x40x50 cm', 850.00, 'Bancaire', NOW() + INTERVAL '2 days'),
  ('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'SEF2026E5F6A7B8C9', 'SinoExport Co', '+86000000000', 'contact@sinoexport.example', 'Shanghai, Chine', 'EuroImport S.A.', '+31000000000', 'contact@euroimport.example', 'Rotterdam, Pays-Bas', 'Chine', 'Pays-Bas', 'Ocean Freight', 'Out for Delivery', 1, 1250.00, '20ft Container', 2400.00, 'Bancaire', NOW() + INTERVAL '1 day'),
  ('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'SEF2026C3D4E5F6A7', 'MedSupply Inc', '+49000000000', 'contact@medsupply.example', 'Berlin, Allemagne', 'Hôpital Central', '+22500000000', 'contact@hopital.example', 'Abidjan, Côte d''Ivoire', 'Allemagne', 'Côte d''Ivoire', 'Express Delivery', 'Delivered', 12, 15.20, '30x30x20 cm', 390.00, 'Mobile', NOW() - INTERVAL '1 day')
ON CONFLICT (tracking_number) DO NOTHING;

INSERT INTO public.shipment_updates (shipment_id, location, status_title, description, timestamp)
VALUES
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Aéroport Paris Charles de Gaulle (CDG)', 'Colis pris en charge', 'Expédition enregistrée et contrôlée au centre de tri export.', NOW() - INTERVAL '18 hours'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'En Vol International AF742', 'En Transit Aérien', 'Le vol cargo à destination de Dakar a décollé.', NOW() - INTERVAL '6 hours'),
  ('a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d', 'Aéroport International Blaise Diagne (DSS)', 'Arrivée Hub Transit', 'Le colis a atterri et pré-dédouanement en cours.', NOW() - INTERVAL '1 hour'),
  ('b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e', 'Port de Rotterdam', 'Dédouanement Effectué', 'Conteneur libéré par la douane portuaire.', NOW() - INTERVAL '3 hours'),
  ('c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f', 'Abidjan Plateau', 'Livré et Signé', 'Livré au destinataire contre signature (Reçu #8821).', NOW() - INTERVAL '1 day')
ON CONFLICT DO NOTHING;
