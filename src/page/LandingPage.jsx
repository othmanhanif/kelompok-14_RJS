import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Aktifkan scroll hanya untuk halaman ini
  useEffect(() => {
    document.body.classList.add('scrollable');
    return () => {
      document.body.classList.remove('scrollable');
    };
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #121212;
          color: #f0f0f0;
        }
        .app {
          min-height: 100vh;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.5);
          position: sticky;
          top: 0;
          background: #1f1f1f;
          z-index: 100;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #90cdf4;
        }
        .nav-links a {
          margin: 0 15px;
          text-decoration: none;
          color: #f0f0f0;
          font-weight: 500;
        }
        .nav-links a:hover {
          color: #90cdf4;
        }
        .hero {
          padding: 100px 20px;
          text-align: center;
        }
        .hero h1 {
          font-size: 42px;
          margin-bottom: 20px;
        }
        .hero p {
          font-size: 18px;
          margin-bottom: 40px;
          opacity: 0.8;
        }
        .hero a, .hero .cta-button {
          padding: 15px 30px;
          background: #90cdf4;
          color: #121212;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }
        .features {
          padding: 80px 20px;
          text-align: center;
        }
        .features h2 {
          font-size: 32px;
          margin-bottom: 50px;
        }
        .features-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
        }
        .feature {
          max-width: 300px;
          text-align: left;
        }
        .feature h3 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #90cdf4;
        }
        .feature p {
          opacity: 0.8;
        }
        footer {
          background: #1f1f1f;
          text-align: center;
          padding: 20px;
          opacity: 0.7;
        }
        .hamburger {
          display: none;
          flex-direction: column;
          cursor: pointer;
        }
        .hamburger div {
          width: 25px;
          height: 3px;
          background: #f0f0f0;
          margin: 4px 0;
        }
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          .hamburger {
            display: flex;
          }
          .mobile-menu {
            position: absolute;
            top: 70px;
            right: 50px;
            background: #1f1f1f;
            border: 1px solid #333;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.5);
          }
          .mobile-menu a {
            display: block;
            margin: 10px 0;
            text-decoration: none;
            color: #f0f0f0;
          }
        }
      `}</style>

      <div className="app">
        <header className="navbar">
          <div className="logo">AssetPro</div>
          <div className="nav-links">
            <a href="#features">features</a>
            <a href="#contact">About</a>
          </div>

          <div className="hamburger" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <Link to="/login" style={{padding: '10px 20px', background:'#0047FF', color:'#fff', borderRadius:'8px', fontWeight: 'bold', textDecoration:'none'}}>Coba Sekarang</Link>
        </header>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <a href="#features" onClick={() => setMenuOpen(false)}>Fitur</a>
              <a href="#benefits" onClick={() => setMenuOpen(false)}>Manfaat</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Kontak</a>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.section className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1>Sistem Informasi Manajemen Aset Operasional</h1>
          <p>Platform berbasis web untuk efisiensi proses peminjaman, pengembalian, dan perbaikan aset operasional karyawan.</p>
          <Link to="/login" className="cta-button">Mulai Sekarang</Link>
        </motion.section>

        <section id="features" className="features">
          <h2>Fitur Unggulan</h2>
          <div className="features-grid">
            <motion.div className="feature" whileHover={{ scale: 1.05 }}>
              <h3>Manajemen Peminjaman</h3>
              <p>Proses peminjaman aset yang terstruktur, mudah, dan transparan.</p>
            </motion.div>
            <motion.div className="feature" whileHover={{ scale: 1.05 }}>
              <h3>Pengembalian & Perbaikan</h3>
              <p>Monitoring pengembalian dan pengajuan perbaikan aset secara otomatis.</p>
            </motion.div>
            <motion.div className="feature" whileHover={{ scale: 1.05 }}>
              <h3>Dashboard & Laporan</h3>
              <p>Analisis data aset secara real-time untuk pengambilan keputusan yang lebih baik.</p>
            </motion.div>
          </div>
        </section>

        <footer>
          © {new Date().getFullYear()} SIMAO - Sistem Informasi Manajemen Aset Operasional.
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
