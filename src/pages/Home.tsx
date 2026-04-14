import { ArrowRight, Truck, RotateCcw, Shield, Sparkles } from 'lucide-react';
import { useFeaturedProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { NavigationState } from '../types';

interface HomeProps {
  onNavigate: (state: NavigationState) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { products, loading } = useFeaturedProducts();

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3622614/pexels-photo-3622614.jpeg?auto=compress&cs=tinysrgb&w=1600)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 md:pb-28 w-full">
          <div className="max-w-2xl">
            <p className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
              Nouvelle Collection
            </p>
            <h1 className="text-white text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight">
              Soyez
              <br />
              <span className="text-amber-400">vous-même.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
              Des vêtements stylés, confortables et accessibles — pour que la mode soit enfin pour tout le monde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate({ page: 'shop' })}
                className="bg-white text-gray-900 px-8 py-4 font-bold text-sm tracking-wide hover:bg-amber-400 transition-colors rounded-full flex items-center gap-2 group w-fit"
              >
                Découvrir la collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate({ page: 'shop', category: 'soldes' })}
                className="border border-white/50 text-white px-8 py-4 font-bold text-sm tracking-wide hover:bg-white/10 transition-colors rounded-full w-fit"
              >
                Voir les soldes
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">
            {[
              { icon: Truck, label: 'Livraison gratuite', sub: 'Dès 60€ d\'achat' },
              { icon: RotateCcw, label: 'Retours 30 jours', sub: 'Satisfait ou remboursé' },
              { icon: Shield, label: 'Paiement sécurisé', sub: '100% protégé' },
              { icon: Sparkles, label: 'Qualité premium', sub: 'Sélection rigoureuse' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-4 md:py-6">
                <Icon size={20} className="text-amber-500 flex-shrink-0" />
                <div>
                  <p className="text-gray-900 text-xs font-semibold">{label}</p>
                  <p className="text-gray-400 text-xs hidden md:block">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-2">Sélection</p>
              <h2 className="text-gray-900 text-4xl md:text-5xl font-black tracking-tight">
                Coups de cœur
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ page: 'shop' })}
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors group"
            >
              Voir tout
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center md:hidden">
            <button
              onClick={() => onNavigate({ page: 'shop' })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 px-6 py-3 rounded-full hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-colors"
            >
              Voir toute la boutique
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:h-96 cursor-pointer group"
            onClick={() => onNavigate({ page: 'shop', category: 'homme' })}
          >
            <img
              src="https://images.pexels.com/photos/1462637/pexels-photo-1462637.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Homme"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Collection</p>
              <h3 className="text-white text-2xl font-black">Homme</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-amber-400 text-xs font-semibold group-hover:gap-2 transition-all">
                Découvrir <ArrowRight size={12} />
              </span>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:h-96 cursor-pointer group"
            onClick={() => onNavigate({ page: 'shop', category: 'femme' })}
          >
            <img
              src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Femme"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Collection</p>
              <h3 className="text-white text-2xl font-black">Femme</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-amber-400 text-xs font-semibold group-hover:gap-2 transition-all">
                Découvrir <ArrowRight size={12} />
              </span>
            </div>
          </div>

          <div
            className="relative overflow-hidden rounded-2xl aspect-[4/5] md:aspect-auto md:h-96 cursor-pointer group"
            onClick={() => onNavigate({ page: 'shop', category: 'unisexe' })}
          >
            <img
              src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Unisexe"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="text-white/70 text-xs uppercase tracking-widest mb-1">Collection</p>
              <h3 className="text-white text-2xl font-black">Unisexe</h3>
              <span className="mt-2 inline-flex items-center gap-1 text-amber-400 text-xs font-semibold group-hover:gap-2 transition-all">
                Découvrir <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Notre histoire"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-amber-400 rounded-2xl p-6 hidden md:block">
                <p className="text-gray-900 font-black text-3xl">12+</p>
                <p className="text-gray-700 text-sm font-medium">pièces par saison</p>
              </div>
            </div>

            <div>
              <p className="text-amber-500 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Notre histoire</p>
              <h2 className="text-gray-900 text-4xl md:text-5xl font-black leading-tight mb-6 tracking-tight">
                La mode pour
                <br />
                tout le monde.
              </h2>
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  LIBRE est née d'un principe simple : embellir la vie de tous les hommes et de toutes les femmes avec des vêtements stylés, confortables et accessibles.
                </p>
                <p>
                  C'est dans un esprit d'écoute des tendances et de la culture jeune que nous sélectionnons des vêtements de qualité — simples et originaux — choisis avec soin afin d'en faire bénéficier le plus grand nombre.
                </p>
                <p>
                  Notre mission ? Rendre la mode plus accessible, tout en restant authentique et à l'écoute de notre public.
                </p>
              </div>
              <button
                onClick={() => onNavigate({ page: 'shop' })}
                className="mt-8 bg-gray-900 text-white px-8 py-4 font-bold text-sm tracking-wide hover:bg-amber-500 transition-colors rounded-full inline-flex items-center gap-2 group"
              >
                Explorer la boutique
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <p className="text-amber-400 text-xs font-semibold tracking-[0.3em] uppercase mb-4">Newsletter</p>
          <h2 className="text-white text-3xl md:text-4xl font-black mb-4">Restez dans la boucle</h2>
          <p className="text-gray-400 mb-8">
            Recevez en avant-première les nouvelles collections, offres exclusives et inspirations mode.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-1 bg-gray-800 text-white placeholder-gray-500 px-5 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button
              type="submit"
              className="bg-amber-400 text-gray-900 px-6 py-3.5 rounded-full font-bold text-sm hover:bg-amber-300 transition-colors whitespace-nowrap"
            >
              S'inscrire
            </button>
          </form>
          <p className="text-gray-600 text-xs mt-4">Aucun spam. Désinscription à tout moment.</p>
        </div>
      </section>
    </div>
  );
}
