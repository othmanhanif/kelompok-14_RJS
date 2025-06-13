import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUsers, FaWarehouse, FaBox, FaTags, 
  FaArrowDown, FaArrowUp, FaChartBar 
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/' },
    { name: 'Pegawai', icon: <FaUsers />, path: '/pegawai' },
    { name: 'Peminjam', icon: <FaUsers />, path: '/peminjams' },
    { name: 'Gudang', icon: <FaWarehouse />, path: '/gudang' },
    { name: 'Aset', icon: <FaBox />, path: '/aset' },
    { name: 'Kategori Aset', icon: <FaTags />, path: '/kategori-aset' },
  ];

  const transaksiItems = [
    { name: 'Aset Masuk', icon: <FaArrowDown style={{ color: 'green' }} />, path: '/aset-masuk' },
    { name: 'Aset Keluar', icon: <FaArrowUp style={{ color: 'red' }} />, path: '/aset-keluar' },
    { name: 'Laporan', icon: <FaChartBar />, path: '/laporan' },
  ];

  const getStyle = (path) => {
    const isActive = currentPath === path || currentPath.startsWith(path + '/');
    return {
      textDecoration: 'none',
      padding: '10px 12px',
      borderRadius: '8px',
      color: isActive ? '#007bff' : '#0f172a',
      backgroundColor: isActive ? '#e6f0ff' : 'transparent',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '6px',
      fontWeight: 500,
      fontSize: '14px',
    };
  };

  return (
    <div style={{
      width: '250px',
      backgroundColor: '#fff',
      borderRight: '1px solid #ddd',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      fontFamily: 'Inter, sans-serif',
      fontSize: '14px',
      padding: '20px'
    }}>

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{
          width: '48px', height: '48px', backgroundColor: '#e6f0ff',
          borderRadius: '12px', display: 'flex', justifyContent: 'center',
          alignItems: 'center', marginRight: '12px'
        }}>
          <FaWarehouse style={{ color: '#007bff', fontSize: '20px' }} />
        </div>
        <div>
          <div style={{ fontWeight: 'bold', fontSize: '16px', color: '#0f172a' }}>AssetPro</div>
          <div style={{ fontSize: '12px', color: '#94a3b8' }}>Management System</div>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        {menuItems.map((item) => (
          <Link key={item.name} to={item.path} style={getStyle(item.path)}>
            {item.icon} {item.name}
          </Link>
        ))}

        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: '#94a3b8',
          textTransform: 'uppercase',
          marginBottom: '8px'
        }}>
          Transaksi
        </div>

        {transaksiItems.map((item) => (
          <Link key={item.name} to={item.path} style={getStyle(item.path)}>
            {item.icon} {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
