import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import { NavigationState } from './types';

function AppContent() {
  const [nav, setNav] = useState<NavigationState>({ page: 'home' });

  const handleNavigate = (state: NavigationState) => {
    setNav(state);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header nav={nav} onNavigate={handleNavigate} />
      <main className="flex-1">
        {nav.page === 'home' && <Home onNavigate={handleNavigate} />}
        {nav.page === 'shop' && (
          <Shop onNavigate={handleNavigate} initialCategory={nav.category} />
        )}
        {nav.page === 'product' && nav.productSlug && (
          <ProductDetail slug={nav.productSlug} onNavigate={handleNavigate} />
        )}
        {nav.page === 'cart' && <Cart onNavigate={handleNavigate} />}
      </main>
      {nav.page !== 'cart' && <Footer onNavigate={handleNavigate} />}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
