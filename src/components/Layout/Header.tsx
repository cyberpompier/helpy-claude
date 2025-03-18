import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, MapPin, MessageSquare, LogOut, Wrench } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-indigo-600 font-bold text-xl">Artisan Connect</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Accueil
            </Link>
            <Link to="/map" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Carte
            </Link>
            <Link to="/emergency" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
              Urgences
            </Link>
            
            {user ? (
              <>
                <Link to="/chat" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Messages
                </Link>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Profil
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary">
                  Inscription
                </Link>
              </>
            )}
          </div>
          
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/map" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <MapPin size={18} className="mr-2" />
                Carte
              </div>
            </Link>
            <Link 
              to="/emergency" 
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Urgences
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/chat" 
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <MessageSquare size={18} className="mr-2" />
                    Messages
                  </div>
                </Link>
                <Link 
                  to="/profile" 
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User size={18} className="mr-2" />
                    Profil
                  </div>
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                >
                  <div className="flex items-center">
                    <LogOut size={18} className="mr-2" />
                    Déconnexion
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Connexion
                </Link>
                <Link 
                  to="/register" 
                  className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
