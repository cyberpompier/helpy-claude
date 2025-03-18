import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export default function ProfilePage() {
  const { user, updateProfile, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [artisanProfile, setArtisanProfile] = useState<any>(null);
  const [profession, setProfession] = useState('');
  const [description, setDescription] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setPhoneNumber(user.phone_number || '');
      
      // If user is an artisan, fetch artisan profile
      if (user.role === 'artisan') {
        fetchArtisanProfile();
      }
    }
  }, [user]);

  const fetchArtisanProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('artisans')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Error fetching artisan profile:', error);
    } else if (data) {
      setArtisanProfile(data);
      setProfession(data.profession || '');
      setDescription(data.description || '');
      setHourlyRate(data.hourly_rate?.toString() || '');
      setIsAvailable(data.is_available || false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      const { error } = await updateProfile({
        full_name: fullName,
        phone_number: phoneNumber
      });
      
      if (error) throw error;
      
      // If user is an artisan, update or create artisan profile
      if (user?.role === 'artisan') {
        if (artisanProfile) {
          // Update existing profile
          const { error: artisanError } = await supabase
            .from('artisans')
            .update({
              profession,
              description,
              hourly_rate: parseFloat(hourlyRate) || 0,
              is_available: isAvailable
            })
            .eq('user_id', user.id);
          
          if (artisanError) throw artisanError;
        } else {
          // Create new profile
          const { error: artisanError } = await supabase
            .from('artisans')
            .insert([{
              user_id: user.id,
              profession,
              description,
              hourly_rate: parseFloat(hourlyRate) || 0,
              is_available: isAvailable,
              rating: 0
            }]);
          
          if (artisanError) throw artisanError;
        }
      }
      
      setMessage({ type: 'success', text: 'Profil mis à jour avec succès!' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error instanceof Error ? error.message : 'Une erreur est survenue lors de la mise à jour du profil' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-gray-500">Vous devez être connecté pour accéder à cette page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <div className="px-4 sm:px-0">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profil</h3>
            <p className="mt-1 text-sm text-gray-600">
              Gérez vos informations personnelles et vos préférences.
            </p>
          </div>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={handleUpdateProfile}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                {message && (
                  <div className={`mb-4 p-4 rounded-md ${
                    message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                  }`}>
                    {message.text}
                  </div>
                )}
                
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      name="full-name"
                      id="full-name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                      Adresse email
                    </label>
                    <input
                      type="text"
                      name="email-address"
                      id="email-address"
                      value={user.email}
                      disabled
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">
                      Numéro de téléphone
                    </label>
                    <input
                      type="text"
                      name="phone-number"
                      id="phone-number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Type de compte
                    </label>
                    <input
                      type="text"
                      value={user.role === 'artisan' ? 'Artisan' : 'Client'}
                      disabled
                      className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50"
                    />
                  </div>
                  
                  {user.role === 'artisan' && (
                    <>
                      <div className="col-span-6">
                        <h3 className="text-lg font-medium text-gray-900">Profil d'artisan</h3>
                        <p className="mt-1 text-sm text-gray-600">
                          Ces informations seront affichées aux clients qui recherchent vos services.
                        </p>
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                          Profession
                        </label>
                        <select
                          id="profession"
                          name="profession"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                          <option value="">Sélectionnez votre profession</option>
                          <option value="Plombier">Plombier</option>
                          <option value="Électricien">Électricien</option>
                          <option value="Serrurier">Serrurier</option>
                          <option value="Chauffagiste">Chauffagiste</option>
                          <option value="Menuisier">Menuisier</option>
                          <option value="Peintre">Peintre</option>
                          <option value="Maçon">Maçon</option>
                          <option value="Couvreur">Couvreur</option>
                          <option value="Jardinier">Jardinier</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      
                      <div className="col-span-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                          Description de vos services
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          rows={3}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          placeholder="Décrivez vos services, votre expérience et vos spécialités..."
                        />
                      </div>
                      
                      <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="hourly-rate" className="block text-sm font-medium text-gray-700">
                          Tarif horaire (€)
                        </label>
                        <input
                          type="number"
                          name="hourly-rate"
                          id="hourly-rate"
                          min="0"
                          step="0.01"
                          value={hourlyRate}
                          onChange={(e) => setHourlyRate(e.target.value)}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="col-span-6">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="is-available"
                              name="is-available"
                              type="checkbox"
                              checked={isAvailable}
                              onChange={(e) => setIsAvailable(e.target.checked)}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="is-available" className="font-medium text-gray-700">
                              Disponible pour des interventions
                            </label>
                            <p className="text-gray-500">
                              Activez cette option pour apparaître sur la carte et recevoir des demandes d'intervention.
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </form>
          
          <div className="mt-6">
            <button
              onClick={() => signOut()}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
