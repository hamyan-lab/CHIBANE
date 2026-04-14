
/*
  # LIBRE Brand Store - Initial Schema

  ## Summary
  Creates the complete product catalog for the LIBRE clothing brand e-commerce store.

  ## New Tables

  ### products
  - `id` (uuid, PK) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (decimal) - Current selling price
  - `original_price` (decimal, nullable) - Original price (for sale items)
  - `category` (text) - Main category: homme, femme, unisexe
  - `subcategory` (text) - Sub-category: t-shirt, hoodie, pantalon, veste, robe, accessoire
  - `image_url` (text) - Primary product image
  - `images` (text[]) - Additional product images
  - `sizes` (text[]) - Available sizes
  - `colors` (text[]) - Available colors
  - `stock` (integer) - Available stock quantity
  - `is_featured` (boolean) - Show on homepage featured section
  - `is_new` (boolean) - Badge for new arrivals
  - `is_sale` (boolean) - Badge for sale items
  - `slug` (text, unique) - URL-friendly product identifier
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - RLS enabled on products table
  - Public SELECT policy for active products (stock >= 0) accessible to anon and authenticated users
  - No INSERT/UPDATE/DELETE policies for public (admin operations would require separate auth)

  ## Notes
  - Products with stock >= 0 are considered active/visible
  - Sale items have both price and original_price populated
  - Featured products appear on the homepage carousel
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price decimal(10,2) NOT NULL,
  original_price decimal(10,2),
  category text NOT NULL DEFAULT 'unisexe',
  subcategory text NOT NULL DEFAULT 't-shirt',
  image_url text NOT NULL DEFAULT '',
  images text[] DEFAULT ARRAY[]::text[],
  sizes text[] DEFAULT ARRAY['XS','S','M','L','XL']::text[],
  colors text[] DEFAULT ARRAY[]::text[],
  stock integer DEFAULT 10,
  is_featured boolean DEFAULT false,
  is_new boolean DEFAULT false,
  is_sale boolean DEFAULT false,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (stock >= 0);

INSERT INTO products (name, description, price, original_price, category, subcategory, image_url, images, sizes, colors, stock, is_featured, is_new, is_sale, slug) VALUES
(
  'Tee Essentiel Blanc',
  'Notre t-shirt signature, taillé dans un coton premium doux et respirant. Un basique revisité qui s''intègre à tous les styles et toutes les tenues.',
  29.90, NULL, 'unisexe', 't-shirt',
  'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Blanc','Noir','Gris'], 50, true, false, false, 'tee-essentiel-blanc'
),
(
  'Hoodie Urban Comfort',
  'Ce hoodie oversized allie confort maximal et style urbain. Sa matière épaisse et son tombé parfait en font la pièce centrale de votre garde-robe.',
  59.90, NULL, 'unisexe', 'hoodie',
  'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL'], ARRAY['Noir','Gris chiné','Crème'], 35, true, true, false, 'hoodie-urban-comfort'
),
(
  'Jean Straight Authentique',
  'Un jean coupe droite qui traverse les tendances. Confectionné en denim de qualité, il s''adapte à votre silhouette pour un confort tout au long de la journée.',
  69.90, NULL, 'homme', 'pantalon',
  'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['28','30','32','34','36','38'], ARRAY['Bleu indigo','Noir','Gris'], 40, true, false, false, 'jean-straight-authentique'
),
(
  'Veste Coach Élégante',
  'La veste coach revisitée pour une allure moderne. Légère et polyvalente, elle se porte en toutes saisons pour un look soigné et décontracté.',
  89.90, 119.90, 'femme', 'veste',
  'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL'], ARRAY['Beige','Noir','Kaki'], 20, true, false, true, 'veste-coach-elegante'
),
(
  'Robe Midi Liberté',
  'Une robe midi fluide et féminine, taillée dans un tissu léger qui épouse les mouvements du corps. L''équilibre parfait entre élégance et liberté.',
  55.90, NULL, 'femme', 'robe',
  'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL'], ARRAY['Terracotta','Noir','Blanc cassé'], 25, false, true, false, 'robe-midi-liberte'
),
(
  'Sweat Col Rond Premium',
  'Le sweatshirt intemporel à col rond dans une version premium. Sa coupe légèrement ample offre un confort absolu sans sacrifier le style.',
  49.90, NULL, 'unisexe', 'sweat',
  'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Gris chiné','Noir','Marine','Bordeaux'], 45, false, false, false, 'sweat-col-rond-premium'
),
(
  'Tee Graphique Downtown',
  'Un t-shirt au design graphique exclusif, pensé pour ceux qui veulent affirmer leur style sans effort. Coton biologique doux, impression qualité.',
  34.90, 44.90, 'unisexe', 't-shirt',
  'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL'], ARRAY['Blanc','Noir'], 30, false, false, true, 'tee-graphique-downtown'
),
(
  'Cargo Relaxed Fit',
  'Le pantalon cargo moderne avec une coupe relaxed confortable. Nombreuses poches fonctionnelles, finitions soignées, style streetwear assumé.',
  74.90, NULL, 'homme', 'pantalon',
  'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['S','M','L','XL','XXL'], ARRAY['Kaki','Noir','Beige sable'], 28, false, true, false, 'cargo-relaxed-fit'
),
(
  'Blazer Oversize Moderne',
  'Le blazer oversize qui redéfinit l''élégance décontractée. Porté avec un jean ou une robe, il apporte une touche sophistiquée immédiate à tout look.',
  99.90, NULL, 'femme', 'veste',
  'https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L'], ARRAY['Camel','Noir','Gris perle'], 15, false, true, false, 'blazer-oversize-moderne'
),
(
  'Tee Basique Noir',
  'Le t-shirt noir indispensable. Coupe ajustée, coton épais de qualité. La pièce que vous porterez avec tout, tout le temps.',
  24.90, NULL, 'unisexe', 't-shirt',
  'https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/4066293/pexels-photo-4066293.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Noir','Blanc','Gris anthracite'], 60, false, false, false, 'tee-basique-noir'
),
(
  'Jogger Tech Confort',
  'Le jogging nouvelle génération : coupe moderne, tissu technique doux et respirant. Du sport à la rue, il suit tous vos mouvements.',
  54.90, 69.90, 'unisexe', 'pantalon',
  'https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/8148587/pexels-photo-8148587.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['XS','S','M','L','XL'], ARRAY['Noir','Gris chiné','Marine'], 40, false, false, true, 'jogger-tech-confort'
),
(
  'Chemise Lin Décontractée',
  'Une chemise en lin légère aux finitions soignées. Sa texture naturelle et sa coupe ample en font la pièce estivale par excellence, casual ou habillée.',
  64.90, NULL, 'homme', 'chemise',
  'https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800',
  ARRAY['https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=800'],
  ARRAY['S','M','L','XL','XXL'], ARRAY['Blanc','Ecru','Bleu ciel','Kaki'], 22, false, true, false, 'chemise-lin-decontractee'
);
