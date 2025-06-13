import React from 'react';

const menuItems = [
  { title: 'Dipinjam' },
  { title: 'Aset' },
  { title: 'Service' },
  { title: 'Peminjam' },
  { title: 'BAP' },
];

const CardMenu = () => {
  return (
    <div
  style={{
    width: '100%', // ✅ Tambahkan ini agar mengikuti lebar penuh
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  }}
>

      {menuItems.map((item, index) => (
        <div key={index} style={{
          height: '100px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: '14px'
        }}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default CardMenu;
