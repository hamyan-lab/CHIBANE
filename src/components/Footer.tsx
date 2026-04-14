import { Instagram, Twitter, Mail } from 'lucide-react';
import { NavigationState } from '../types';

interface FooterProps {
  onNavigate: (state: NavigationState) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-white text-2xl font-black tracking-widest mb-4">LIBRE</h2>
            <p className="text-sm leading-relaxed max-w-sm text-gray-400">
              Embellir la vie de tous avec des vêtements stylés, confortables et accessibles.
              Parce que la mode doit être pour tout le monde, sans se compliquer la vie.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Boutique</h3>
            <ul className="space-y-3">
              {[
                { label: 'Tous les produits', category: 'tous' },
                { label: 'Homme', category: 'homme' },
                { label: 'Femme', category: 'femme' },
                { label: 'Unisexe', category: 'unisexe' },
              ].map(item => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate({ page: 'shop', category: item.category })}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Informations</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guide des tailles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2024 LIBRE. Tous droits réservés.</p>
          <p>Style. Confort. Liberté.</p>
        </div>
      </div>
    </footer>
  );
}
