import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Workbox } from 'workbox-window';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import MainLayout from './components/Layout/MainLayout';
import HomePage from './pages/HomePage';
import MapPage from './pages/MapPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RegisterSuccessPage from './pages/RegisterSuccessPage';
import ChatPage from './pages/ChatPage';
import EmergencyGuidePage from './pages/EmergencyGuidePage';
import ProfilePage from './pages/ProfilePage';

function App() {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      const wb = new Workbox('/sw.js');
      
      wb.addEventListener('installed', (event) => {
        if (event.isUpdate) {
          if (confirm('Nouvelle version disponible! Recharger pour mettre à jour?')) {
            window.location.reload();
          }
        }
      });
      
      wb.register();
    }
  }, []);

  return (
    <AuthProvider>
      <LocationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="map" element={<MapPage />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="emergency" element={<EmergencyGuidePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/register-success" element={<RegisterSuccessPage />} />
          </Routes>
        </BrowserRouter>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;
