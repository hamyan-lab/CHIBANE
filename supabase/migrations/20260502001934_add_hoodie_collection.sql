
/*
  # Add Hoodie Collection - Unisexe

  ## Summary
  Adds a new unisexe hoodie collection with multiple color variants to the product catalog.
  This is the featured hero collection for the homepage.

  ## New Products
  - Hoodie Unisexe Signature in 5 color variants
    - Charcoal (L)
    - Navy (M)
    - Forest Green (S)
    - Maroon (M)
    - Dark Grey (XL and M)
    - Medium Grey (M)

  ## Notes
  - All items marked as featured for homepage display
  - Marked as new arrivals
  - Available in multiple sizes and colors
  - Positioned as premium unisexe collection
*/

INSERT INTO products (name, description, price, original_price, category, subcategory, image_url, images, sizes, colors, stock, is_featured, is_new, is_sale, slug) VALUES
(
  'Hoodie Unisexe Signature',
  'Notre hoodie signature unisexe, pensé pour tous. Confortable, stylé et disponible dans une palette de couleurs intemporelles. Parfait pour tous les jours, toutes les saisons, toutes les silhouettes.',
  64.90, NULL, 'unisexe', 'hoodie',
  '/image copy.png',
  ARRAY['/image copy.png'],
  ARRAY['XS','S','M','L','XL','XXL'], ARRAY['Charcoal','Navy','Forest Green','Maroon','Dark Grey','Medium Grey'], 100, true, true, false, 'hoodie-unisexe-signature'
);
