import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import PrivateRoute from './components/PrivateRoute';

import Dashboard from './page/Dashboard';
import MainGudang from './page/MainGudang';
import TambahGudang from './page/TambahGudang';
import Aset from './page/aset/Aset';
import Login from './page/Login';
import LandingPage from './page/LandingPage';
import AdminPeminjam from './page/admin/peminjams';
import PeminjamCreate from './page/admin/peminjams/create';
import PeminjamEdit from './page/admin/peminjams/edit';
import KategoriAset from './page/kategori_aset/KategoriAset';
import TambahKategoriAset from './page/kategori_aset/TambahKategoriAset';
import AdminPegawai from './page/pegawai/index';
import PegawaiCreate from './page/pegawai/create';
import PegawaiEdit from './page/pegawai/edit';

import './App.css';

const App = () => {
  const location = useLocation();

  const noLayoutPaths = ['/', '/login'];
  const isNoLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Topbar />
            <div style={{ flex: 1, padding: '20px', background: '#f9f9f9' }}>
              <Routes key={location.pathname} location={location}>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/gudang" element={<PrivateRoute><MainGudang /></PrivateRoute>} />
                <Route path="/tambah-gudang" element={<PrivateRoute><TambahGudang /></PrivateRoute>} />
                <Route path="/edit-gudang/:id" element={<PrivateRoute><TambahGudang /></PrivateRoute>} />
                <Route path="/aset" element={<PrivateRoute><Aset /></PrivateRoute>} />
                <Route path="/peminjams" element={<PrivateRoute><AdminPeminjam /></PrivateRoute>} />
                <Route path="/peminjams/create" element={<PrivateRoute><PeminjamCreate /></PrivateRoute>} />
                <Route path="/peminjams/:id/edit" element={<PrivateRoute><PeminjamEdit /></PrivateRoute>} />
                <Route path="/kategori-aset" element={<PrivateRoute><KategoriAset /></PrivateRoute>} />
                <Route path="/kategori-aset/tambah" element={<PrivateRoute><TambahKategoriAset /></PrivateRoute>} />
                <Route path="/pegawai" element={<PrivateRoute><AdminPegawai /></PrivateRoute>} />
                <Route path="/pegawai/create" element={<PrivateRoute><PegawaiCreate /></PrivateRoute>} />
                <Route path="/pegawai/:id/edit" element={<PrivateRoute><PegawaiEdit /></PrivateRoute>} />
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
