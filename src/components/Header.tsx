import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { NavigationState } from '../types';

interface HeaderProps {
  nav: NavigationState;
  onNavigate: (state: NavigationState) => void;
}

export default function Header({ nav, onNavigate }: HeaderProps) {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const isHome = nav.page === 'home';
  const isDark = isHome && !scrolled;

  const links = [
    { label: 'Accueil', page: 'home' as const },
    { label: 'Boutique', page: 'shop' as const },
    { label: 'Homme', page: 'shop' as const, category: 'homme' },
    { label: 'Femme', page: 'shop' as const, category: 'femme' },
    { label: 'Unisexe', page: 'shop' as const, category: 'unisexe' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => onNavigate({ page: 'home' })}
            className={`text-2xl font-black tracking-widest transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            LIBRE
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button
                key={link.label}
                onClick={() => onNavigate({ page: link.page, category: link.category })}
                className={`text-sm font-medium tracking-wide transition-colors hover:opacity-60 ${
                  isDark ? 'text-white' : 'text-gray-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate({ page: 'cart' })}
              className={`relative p-2 transition-colors ${isDark ? 'text-white' : 'text-gray-900'}`}
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                onNavigate({ page: link.page, category: link.category });
                setMenuOpen(false);
              }}
              className="text-sm font-medium text-gray-700 text-left py-2 hover:text-amber-600 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate({ page: 'cart' });
              setMenuOpen(false);
            }}
            className="text-sm font-medium text-gray-700 text-left py-2 hover:text-amber-600 transition-colors flex items-center gap-2"
          >
            <ShoppingBag size={16} />
            Panier {totalItems > 0 && `(${totalItems})`}
          </button>
        </div>
      )}
    </header>
  );
}
