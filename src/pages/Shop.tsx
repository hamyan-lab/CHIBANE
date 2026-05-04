import { useState, useEffect } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { NavigationState } from '../types';

interface ShopProps {
  onNavigate: (state: NavigationState) => void;
  initialCategory?: string;
}

const CATEGORIES = [
  { label: 'Unisexe', value: 'unisexe' },
];

const SUBCATEGORIES = [
  'Tous', 'hoodie',
];

const SORT_OPTIONS = [
  { label: 'Nouveautés', value: 'new' },
  { label: 'Prix croissant', value: 'price_asc' },
  { label: 'Prix décroissant', value: 'price_desc' },
];

export default function Shop({ onNavigate, initialCategory }: ShopProps) {
  const [category, setCategory] = useState('unisexe');
  const [subcategory, setSubcategory] = useState('Tous');
  const [sort, setSort] = useState('new');
  const [filterOpen, setFilterOpen] = useState(false);

  const { products, loading } = useProducts(category);

  const filtered = products
    .filter(p => subcategory === 'Tous' || p.subcategory === subcategory)
    .sort((a, b) => {
      if (sort === 'price_asc') return a.price - b.price;
      if (sort === 'price_desc') return b.price - a.price;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="bg-gray-50 border-b border-gray-100 py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Notre sélection</p>
          <h1 className="text-gray-900 text-4xl md:text-5xl font-black tracking-tight">Boutique</h1>
          <p className="text-gray-400 mt-2 text-sm">{filtered.length} produit{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {CATEGORIES.map(cat => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                  category === cat.value
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filtres
              {subcategory !== 'Tous' && (
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
              )}
            </button>

            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm font-medium text-gray-600 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer bg-white"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {filterOpen && (
          <div className="mt-4 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Type de vêtement</h3>
              {subcategory !== 'Tous' && (
                <button
                  onClick={() => setSubcategory('Tous')}
                  className="text-xs text-gray-400 hover:text-gray-700 flex items-center gap-1"
                >
                  <X size={12} /> Réinitialiser
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {SUBCATEGORIES.map(sub => (
                <button
                  key={sub}
                  onClick={() => setSubcategory(sub)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                    subcategory === sub
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl aspect-[3/4]" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg">Aucun produit trouvé</p>
            <button
              onClick={() => { setCategory('tous'); setSubcategory('Tous'); }}
              className="mt-4 text-sm font-semibold text-amber-500 hover:underline"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
