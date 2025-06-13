import React from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './page/Dashboard';
import Gudang from './page/Gudang';
import Aset from './page/aset/Aset';

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
            <Route path="/aset" element={<Aset />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
