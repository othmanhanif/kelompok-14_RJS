import React from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./page/Dashboard";
import MainGudang from "./page/MainGudang";
import TambahGudang from "./page/TambahGudang";
import Aset from "./page/aset/Aset";
import Login from "./page/Login";
import LandingPage from "./page/LandingPage";
import AdminPeminjam from "./page/admin/peminjams";
import PeminjamCreate from "./page/admin/peminjams/create";
import PeminjamEdit from "./page/admin/peminjams/edit";
import KategoriAset from "./page/kategori_aset/KategoriAset";
import TambahKategoriAset from "./page/kategori_aset/TambahKategoriAset";
import "./App.css";
import AsetKeluar from "./page/admin/aset-keluar";
import AsetMasuk from "./page/admin/aset-masuk";
import Pinjam from "./page/admin/aset-masuk/pinjam";

const App = () => {
  const location = useLocation();

  // Halaman tanpa layout (tanpa Sidebar dan Topbar)
  const noLayoutPaths = ["/", "/login"];
  const isNoLayout = noLayoutPaths.includes(location.pathname);

  return (
    <>
      {isNoLayout ? (
        <Routes key={location.pathname} location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar />
          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Topbar />
            <div style={{ flex: 1, padding: "20px", background: "#f9f9f9" }}>
              <Routes key={location.pathname} location={location}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/gudang" element={<MainGudang />} />
                <Route path="/tambah-gudang" element={<TambahGudang />} />
                <Route path="/edit-gudang/:id" element={<TambahGudang />} />
                <Route path="/Aset" element={<Aset />} />
                <Route path="/peminjams" element={<AdminPeminjam />} />
                <Route path="/peminjams/create" element={<PeminjamCreate />} />
                <Route path="/peminjams/:id/edit" element={<PeminjamEdit />} />
                <Route path="/kategori-aset" element={<KategoriAset />} />
                <Route
                  path="/kategori-aset/tambah"
                  element={<TambahKategoriAset />}
                />
                <Route path="aset-keluar" element={<AsetKeluar />} />
                <Route path="aset-masuk" element={<AsetMasuk />} />
                <Route path="/aset-masuk/pinjam/:id" element={<Pinjam />} />

              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
