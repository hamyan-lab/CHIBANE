
/*
  # Add Currency Column and Hoodie Variants

  1. New Column
    - Added `currency` column with default 'CAD'

  2. New Products
    - 6 hoodie variants with specific colors and sizes
    - All priced at 89.99 CAD
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'currency'
  ) THEN
    ALTER TABLE products ADD COLUMN currency TEXT DEFAULT 'CAD';
  END IF;
END $$;

DELETE FROM products;

INSERT INTO products (name, description, price, currency, category, subcategory, image_url, sizes, colors, stock, is_featured, is_new, slug) VALUES
(
  'Hoodie Unisexe Charcoal',
  'Hoodie unisexe signature en Charcoal - Taille L. Confortable, stylé et parfait pour tous les jours.',
  89.99, 'CAD', 'unisexe', 'hoodie', '/image_(1).png', ARRAY['L'], ARRAY['Charcoal'], 50, true, true, 'hoodie-charcoal-l'
),
(
  'Hoodie Unisexe Navy',
  'Hoodie unisexe signature en Navy - Taille M. Confortable, stylé et parfait pour tous les jours.',
  89.99, 'CAD', 'unisexe', 'hoodie', '/image_(1).png', ARRAY['M'], ARRAY['Navy'], 50, true, true, 'hoodie-navy-m'
),
(
  'Hoodie Unisexe Forest Green',
  'Hoodie unisexe signature en Forest Green - Taille S. Confortable, stylé et parfait pour tous les jours.',
  89.99, 'CAD', 'unisexe', 'hoodie', '/image_(1).png', ARRAY['S'], ARRAY['Forest Green'], 50, true, true, 'hoodie-forest-green-s'
),
(
  'Hoodie Unisexe Maroon',
  'Hoodie unisexe signature en Maroon - Taille M. Confortable, stylé et parfait pour tous les jours.',
  89.99, 'CAD', 'unisexe', 'hoodie', '/image_(1).png', ARRAY['M'], ARRAY['Maroon'], 50, true, true, 'hoodie-maroon-m'
),
(
  'Hoodie Unisexe Dark Grey XL',
  'Hoodie unisexe signature en Dark Grey - Taille XL. Confortable, stylé et parfait pour tous les jours.',
  89.99, 'CAD', 'unisexe', 'hoodie', '/image_(1).png', ARRAY['XL'], ARRAY['Dark Grey'], 50, true, true, 'hoodie-dark-grey-xl'
),
(
  'Hoodie Unisexe Dark Grey M',
  'Hoodie unisexe signature en Dark Grey - Taille M. Confortable, stylé et parfait pour tous les jours.',
  89.99, 'CAD', 'unisexe', 'hoodie', '/image_(1).png', ARRAY['M'], ARRAY['Dark Grey'], 50, true, true, 'hoodie-dark-grey-m'
);
