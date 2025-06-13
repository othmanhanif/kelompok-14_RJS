import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Gudang from './page/Gudang';
import Aset from './page/Aset';
import KategoriAset from './page/kategori_aset/KategoriAset';
import TambahKategoriAset from './page/kategori_aset/TambahKategoriAset';
import './App.css'

const App = () => {
  const location = useLocation();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <div style={{ flex: 1, padding: '20px', background: '#f9f9f9' }}>
          {/* Tambahkan key di Routes */}
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/gudang" element={<Gudang />} />
            <Route path="/Aset" element={<Aset />} />
            <Route path="/kategori-aset" element={<KategoriAset />} />
            <Route path="/kategori-aset/tambah" element={<TambahKategoriAset />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
