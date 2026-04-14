import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

export function useProducts(category?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let query = supabase.from('products').select('*').order('created_at', { ascending: false });
      if (category && category !== 'tous') {
        query = query.eq('category', category);
      }
      const { data, error: err } = await query;
      if (err) setError(err.message);
      else setProducts(data as Product[]);
      setLoading(false);
    };
    fetch();
  }, [category]);

  return { products, loading, error };
}

export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_featured', true)
        .limit(4);
      setProducts((data as Product[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return { products, loading };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      setProduct(data as Product | null);
      setLoading(false);
    };
    fetch();
  }, [slug]);

  return { product, loading };
}
