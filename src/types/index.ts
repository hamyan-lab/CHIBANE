export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  original_price: number | null;
  category: string;
  subcategory: string;
  image_url: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock: number;
  is_featured: boolean;
  is_new: boolean;
  is_sale: boolean;
  slug: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export type Page = 'home' | 'shop' | 'product' | 'cart';

export interface NavigationState {
  page: Page;
  productSlug?: string;
  category?: string;
}
