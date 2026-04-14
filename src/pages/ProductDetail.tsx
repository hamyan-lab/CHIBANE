import { useState } from 'react';
import { ShoppingBag, ArrowLeft, Check, Truck, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { NavigationState } from '../types';

interface ProductDetailProps {
  slug: string;
  onNavigate: (state: NavigationState) => void;
}

export default function ProductDetail({ slug, onNavigate }: ProductDetailProps) {
  const { product, loading } = useProduct(slug);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) { setSizeError(true); return; }
    if (product?.colors.length && !selectedColor) { setColorError(true); return; }
    if (!product) return;
    addItem(product, selectedSize, selectedColor || product.colors[0] || '');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product?.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Produit introuvable</p>
        <button onClick={() => onNavigate({ page: 'shop' })} className="text-sm font-semibold text-gray-900 underline">
          Retour à la boutique
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => onNavigate({ page: 'shop' })}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Retour à la boutique
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <div className="space-y-3">
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5]">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_new && (
                  <span className="bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full">Nouveau</span>
                )}
                {product.is_sale && discount && (
                  <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">-{discount}%</span>
                )}
              </div>
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden aspect-square bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity">
                    <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="md:sticky md:top-24 md:self-start">
            <p className="text-amber-500 text-xs font-semibold tracking-[0.2em] uppercase mb-2">
              {product.category} · {product.subcategory}
            </p>
            <h1 className="text-gray-900 text-3xl md:text-4xl font-black leading-tight mb-4">{product.name}</h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-gray-900">{product.price.toFixed(2)} €</span>
              {product.original_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{product.original_price.toFixed(2)} €</span>
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">
                    Économisez {(product.original_price - product.price).toFixed(2)} €
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-500 leading-relaxed text-sm mb-8">{product.description}</p>

            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-gray-900">
                    Couleur {selectedColor && <span className="font-normal text-gray-500">— {selectedColor}</span>}
                  </p>
                  {colorError && !selectedColor && (
                    <p className="text-xs text-red-500">Veuillez choisir une couleur</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => { setSelectedColor(color); setColorError(false); }}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                        selectedColor === color
                          ? 'border-gray-900 bg-gray-900 text-white'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-gray-900">Taille</p>
                <div className="flex items-center gap-4">
                  {sizeError && !selectedSize && (
                    <p className="text-xs text-red-500">Veuillez choisir une taille</p>
                  )}
                  <button className="text-xs text-gray-400 underline hover:text-gray-700">Guide des tailles</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`w-14 py-2.5 rounded-lg text-sm font-semibold border transition-all ${
                      selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-4 rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-3 transition-all ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-900 text-white hover:bg-amber-500'
              }`}
            >
              {added ? (
                <>
                  <Check size={18} />
                  Ajouté au panier
                </>
              ) : (
                <>
                  <ShoppingBag size={18} />
                  Ajouter au panier
                </>
              )}
            </button>

            <button
              onClick={() => onNavigate({ page: 'cart' })}
              className="w-full mt-3 py-4 rounded-full font-bold text-sm tracking-wide border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              Voir mon panier
            </button>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <Truck size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">Livraison gratuite</p>
                  <p className="text-xs text-gray-400">Dès 60€</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                <RotateCcw size={16} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-gray-900">Retours 30 jours</p>
                  <p className="text-xs text-gray-400">Satisfait ou remboursé</p>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <button
                className="flex items-center justify-between w-full text-sm font-semibold text-gray-900"
                onClick={() => setDetailsOpen(!detailsOpen)}
              >
                Détails & Composition
                {detailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {detailsOpen && (
                <ul className="mt-4 space-y-2 text-sm text-gray-500">
                  <li>• Matière principale : coton premium</li>
                  <li>• Coupe : ajustée / regular selon la pièce</li>
                  <li>• Entretien : lavage à 30°C, pas de sèche-linge</li>
                  <li>• Fabriqué selon des standards de qualité rigoureux</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
