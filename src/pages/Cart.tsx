import { Minus, Plus, X, ArrowLeft, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { NavigationState } from '../types';

interface CartProps {
  onNavigate: (state: NavigationState) => void;
}

export default function Cart({ onNavigate }: CartProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  const shipping = totalPrice >= 60 ? 0 : 4.90;
  const grandTotal = totalPrice + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-16 md:pt-20 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Votre panier est vide</h2>
          <p className="text-gray-400 mb-8 text-sm">Découvrez notre sélection et trouvez des pièces qui vous ressemblent.</p>
          <button
            onClick={() => onNavigate({ page: 'shop' })}
            className="bg-gray-900 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-amber-500 transition-colors inline-flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            Explorer la boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => onNavigate({ page: 'shop' })}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Continuer mes achats
        </button>

        <div className="flex items-end gap-3 mb-10">
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Panier</h1>
          <span className="text-gray-400 text-sm mb-1.5">({totalItems} article{totalItems > 1 ? 's' : ''})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <div key={`${item.product.id}-${item.size}-${item.color}-${i}`} className="flex gap-5 p-4 bg-gray-50 rounded-2xl">
                <div
                  className="w-24 h-28 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer bg-gray-200"
                  onClick={() => onNavigate({ page: 'product', productSlug: item.product.slug })}
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{item.product.subcategory}</p>
                      <h3
                        className="text-sm font-bold text-gray-900 mt-0.5 cursor-pointer hover:text-amber-600 transition-colors"
                        onClick={() => onNavigate({ page: 'product', productSlug: item.product.slug })}
                      >
                        {item.product.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id, item.size, item.color)}
                      className="p-1.5 text-gray-300 hover:text-red-400 transition-colors flex-shrink-0"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    {item.size && (
                      <span className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded font-medium">
                        {item.size}
                      </span>
                    )}
                    {item.color && (
                      <span className="text-xs text-gray-400">{item.color}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gray-200 bg-white rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-500"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <span className="font-black text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)} CAD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 sticky top-24">
              <h2 className="text-lg font-black text-gray-900 mb-6">Récapitulatif</h2>

              <div className="mb-4">
                <div className="flex items-center gap-2 border border-gray-200 bg-white rounded-xl overflow-hidden px-4">
                  <Tag size={14} className="text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Code promo"
                    className="flex-1 py-3 text-sm focus:outline-none bg-transparent placeholder-gray-400"
                  />
                  <button className="text-xs font-bold text-amber-600 hover:text-amber-700">
                    Appliquer
                  </button>
                </div>
              </div>

              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Sous-total</span>
                  <span>${totalPrice.toFixed(2)} CAD</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Livraison</span>
                  <span className={shipping === 0 ? 'text-green-500 font-semibold' : ''}>
                    {shipping === 0 ? 'Gratuite' : `$${shipping.toFixed(2)} CAD`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-amber-600">
                    Plus que ${(60 - totalPrice).toFixed(2)} CAD pour la livraison gratuite
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center py-4 border-t border-gray-200 mb-6">
                <span className="font-black text-gray-900">Total</span>
                <span className="font-black text-xl text-gray-900">${grandTotal.toFixed(2)} CAD</span>
              </div>

              <button className="w-full bg-gray-900 text-white py-4 rounded-full font-bold text-sm hover:bg-amber-500 transition-colors">
                Passer commande
              </button>

              <p className="text-center text-xs text-gray-400 mt-4">
                Paiement 100% sécurisé
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
