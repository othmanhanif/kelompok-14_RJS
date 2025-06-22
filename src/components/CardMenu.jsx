import React from 'react';

const CardMenu = ({ data }) => {
  const cardStyle = {
    height: '100px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '14px',
    flexDirection: 'column',
  };

  const containerStyle = {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '16px',
    marginBottom: '24px',
  };

  const menuItems = [
    { title: 'Dipinjam', value: data?.status_aset?.dipinjam || 0 },
    { title: 'Aset', value: data?.aset_keseluruhan || 0 },
    { title: 'Service', value: data?.status_aset?.rusak || 0 },
    { title: 'Tersedia', value: data?.status_aset?.tersedia || 0 },
    { title: 'BAP', value: 0 }, // ❗Bisa diganti kalau ada field BAP
  ];

  return (
    <div style={containerStyle}>
      {menuItems.map((item, index) => (
        <div key={index} style={cardStyle}>
          <div style={{ fontSize: '12px', color: '#666' }}>{item.title}</div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '4px' }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default CardMenu;
