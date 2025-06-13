import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Gudang from './page/Gudang';
import Aset from './page/Aset';
import './App.css';
import Login from './page/Login';
import LandingPage from './page/LandingPage';

const App = () => {
  const location = useLocation();

  // Tentukan halaman yang tidak pakai Sidebar dan Topbar
  const noLayoutPaths = ['/', '/login'];
  const isNoLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        // halaman tidak menggunakan layout
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        // Halaman yang menggunakan layout (Sidebar + Topbar)
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar />
            <div style={{ flex: 1, padding: '20px', background: '#f9f9f9' }}>
              <Routes key={location.pathname} location={location}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gudang" element={<Gudang />} />
                <Route path="/Aset" element={<Aset />} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
