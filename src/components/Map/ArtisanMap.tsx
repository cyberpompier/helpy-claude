import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { supabase } from '../../lib/supabase';
import { useLocation } from '../../contexts/LocationContext';
import type { Artisan } from '../../types';

// Custom marker icon
const artisanIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const userIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to recenter map when location changes
function RecenterAutomatically({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
}

export default function ArtisanMap() {
  const { location } = useLocation();
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [selectedProfession, setSelectedProfession] = useState<string>('all');
  const [professions, setProfessions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtisans = async () => {
      setLoading(true);
      let query = supabase
        .from('artisans')
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq('is_available', true);
      
      if (selectedProfession !== 'all') {
        query = query.eq('profession', selectedProfession);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching artisans:', error);
      } else if (data) {
        setArtisans(data as unknown as Artisan[]);
        
        // Extract unique professions
        const uniqueProfessions = [...new Set(data.map(item => item.profession))];
        setProfessions(uniqueProfessions);
      }
      
      setLoading(false);
    };

    fetchArtisans();
  }, [selectedProfession]);

  if (!location) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Chargement de votre position...</p>
      </div>
    );
  }

  const position: [number, number] = [location.latitude, location.longitude];

  return (
    <div className="h-full flex flex-col">
      <div className="bg-white p-4 shadow-sm z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Artisans disponibles près de vous</h2>
          
          <div className="mb-4">
            <label htmlFor="profession-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filtrer par profession
            </label>
            <select
              id="profession-filter"
              value={selectedProfession}
              onChange={(e) => setSelectedProfession(e.target.value)}
              className="input-field"
            >
              <option value="all">Toutes les professions</option>
              {professions.map((profession) => (
                <option key={profession} value={profession}>
                  {profession}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex-grow relative">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* User location marker */}
          <Marker position={position} icon={userIcon}>
            <Popup>
              <div>
                <h3 className="font-medium">Votre position</h3>
                <p className="text-sm text-gray-600">
                  Lat: {location.latitude.toFixed(6)}, Lng: {location.longitude.toFixed(6)}
                </p>
              </div>
            </Popup>
          </Marker>
          
          {/* Artisan markers */}
          {artisans.map((artisan) => {
            if (!artisan.latitude || !artisan.longitude) return null;
            
            return (
              <Marker
                key={artisan.id}
                position={[artisan.latitude, artisan.longitude]}
                icon={artisanIcon}
              >
                <Popup>
                  <div className="text-center">
                    <h3 className="font-medium">{(artisan as any).profiles?.full_name || 'Artisan'}</h3>
                    <p className="text-sm text-gray-600">{artisan.profession}</p>
                    <p className="text-sm">{artisan.description}</p>
                    <p className="text-sm font-medium mt-2">{artisan.hourly_rate}€/heure</p>
                    <button className="btn-primary text-sm mt-2 w-full">
                      Contacter
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
          
          <RecenterAutomatically position={position} />
        </MapContainer>
        
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <p className="text-gray-600">Chargement des artisans...</p>
          </div>
        )}
      </div>
    </div>
  );
}
