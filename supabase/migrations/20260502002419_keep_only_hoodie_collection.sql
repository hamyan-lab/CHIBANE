
/*
  # Keep Only Hoodie Collection

  ## Summary
  Removes all products except the Hoodie Unisexe Signature collection.
  The store now exclusively features the hoodie unisexe in 6 colors.
*/

DELETE FROM products
WHERE slug != 'hoodie-unisexe-signature';
