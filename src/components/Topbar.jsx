import React from 'react';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div style={{
      width: '100%',
      height: '60px',
      backgroundColor: '#fff',
      borderBottom: '1px solid #eee',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      boxSizing: 'border-box',
      zIndex: 1000
    }}>
      {/* Kiri: Kosong atau Logo */}
      <div />

      {/* Kanan: Notifikasi + Avatar + Logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <FaBell style={{ color: '#666', fontSize: '18px', cursor: 'pointer' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src="https://i.pravatar.cc/40"
            alt="Avatar"
            style={{ borderRadius: '50%', width: '32px', height: '32px' }}
          />
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Admin User</div>
            <div style={{ fontSize: '12px', color: '#999' }}>Administrator</div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: '8px 12px',
            backgroundColor: '#ef4444',
            border: 'none',
            borderRadius: '6px',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Topbar;
