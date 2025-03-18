import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Artisan Connect</h3>
            <p className="text-gray-300 text-sm">
              Trouvez des artisans qualifiés en urgence près de chez vous. 
              Notre plateforme vous met en relation avec des professionnels 
              disponibles pour résoudre vos problèmes rapidement.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/map" className="text-gray-300 hover:text-white text-sm">
                  Carte des artisans
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="text-gray-300 hover:text-white text-sm">
                  Guide d'urgence
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white text-sm">
                  Devenir artisan
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: contact@artisanconnect.fr</li>
              <li>Téléphone: +33 1 23 45 67 89</li>
              <li>Adresse: 123 Rue de l'Artisanat, 75001 Paris</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} Artisan Connect. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
