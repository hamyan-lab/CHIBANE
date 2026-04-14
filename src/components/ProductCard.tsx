import { ShoppingBag } from 'lucide-react';
import { Product, NavigationState } from '../types';

interface ProductCardProps {
  product: Product;
  onNavigate: (state: NavigationState) => void;
}

export default function ProductCard({ product, onNavigate }: ProductCardProps) {
  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => onNavigate({ page: 'product', productSlug: product.slug })}
    >
      <div className="relative overflow-hidden bg-gray-100 rounded-xl aspect-[3/4]">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.is_new && (
            <span className="bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide">
              Nouveau
            </span>
          )}
          {product.is_sale && discount && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={e => {
              e.stopPropagation();
              onNavigate({ page: 'product', productSlug: product.slug });
            }}
            className="w-full bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <ShoppingBag size={15} />
            Voir le produit
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider">{product.subcategory}</p>
        <h3 className="text-gray-900 font-semibold text-sm leading-snug">{product.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-900 font-bold">{product.price.toFixed(2)} €</span>
          {product.original_price && (
            <span className="text-gray-400 text-sm line-through">{product.original_price.toFixed(2)} €</span>
          )}
        </div>
        {product.sizes.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {product.sizes.slice(0, 5).map(size => (
              <span key={size} className="text-xs text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">
                {size}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
