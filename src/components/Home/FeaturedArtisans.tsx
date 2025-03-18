import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { Artisan } from '../../types';

export default function FeaturedArtisans() {
  const [artisans, setArtisans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedArtisans = async () => {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('artisans')
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq('is_available', true)
        .order('rating', { ascending: false })
        .limit(4);
      
      if (error) {
        console.error('Error fetching featured artisans:', error);
      } else if (data) {
        setArtisans(data);
      }
      
      setLoading(false);
    };

    fetchFeaturedArtisans();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Artisans à la une</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Nos meilleurs professionnels
            </p>
          </div>
          <div className="mt-10 text-center">
            <p className="text-gray-500">Chargement des artisans...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Artisans à la une</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Nos meilleurs professionnels
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Découvrez les artisans les mieux notés disponibles sur notre plateforme.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {artisans.map((artisan) => (
            <div key={artisan.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {artisan.profiles?.avatar_url ? (
                      <img 
                        src={artisan.profiles.avatar_url} 
                        alt={artisan.profiles.full_name} 
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xl font-medium">
                        {artisan.profiles?.full_name?.charAt(0) || 'A'}
                      </span>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">{artisan.profiles?.full_name || 'Artisan'}</h3>
                    <p className="text-sm text-gray-500">{artisan.profession}</p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{artisan.description}</p>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{artisan.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-sm font-medium text-indigo-600">{artisan.hourly_rate}€/h</div>
                </div>
                
                {artisan.latitude && artisan.longitude && (
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>Disponible à proximité</span>
                  </div>
                )}
                
                <div className="mt-5">
                  <Link
                    to="/map"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Contacter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link
            to="/map"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Voir tous les artisans
          </Link>
        </div>
      </div>
    </section>
  );
}
