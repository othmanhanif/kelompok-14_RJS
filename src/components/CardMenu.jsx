import React from 'react';

const CardMenu = ({ title, onClick }) => {
  return (
    <div 
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        textAlign: 'center',
        cursor: 'pointer',
        border: '1px solid #ddd',
        fontWeight: 500,
        color: '#0f172a'
      }}
    >
      {title}
    </div>
  )
}

export default CardMenu;
