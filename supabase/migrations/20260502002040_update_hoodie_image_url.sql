
/*
  # Update Hoodie Product Image URL

  ## Summary
  Updates the hoodie image URL to use the correct public path.
*/

UPDATE products
SET image_url = '/image.png'
WHERE slug = 'hoodie-unisexe-signature';
