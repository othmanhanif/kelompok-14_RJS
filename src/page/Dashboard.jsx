import React from 'react';
import CardMenu from '../components/CardMenu';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

export default function Dashboard() {
  const wrapper = {
    height: 'calc(100vh - 100px)', // sisakan tinggi topbar (misalnya 60px)
    overflowY: 'auto',
    padding: '12px',
    backgroundColor: '#f3f4f6',
    boxSizing: 'border-box',
  };

  const gridTwo = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '12px',
    marginTop: '12px',
  };

  const card = {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '10px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
  };

  const chartStyle = {
    width: '100%',
    height: '200px',
  };

  return (
    <div style={wrapper}>
      <CardMenu />

      <div style={gridTwo}>
        <div style={card}>
          <h4>Status Aset Keseluruhan</h4>
          <div style={chartStyle}>
            <PieChart title="Status Aset Keseluruhan" />
          </div>
        </div>
        <div style={card}>
          <h4>Proporsi Aset Dipinjam</h4>
          <div style={chartStyle}>
            <PieChart title="Proporsi Aset Dipinjam" />
          </div>
        </div>
      </div>

      <div style={gridTwo}>
        <div style={card}>
          <h4>Distribusi Kerusakan Aset per Kategori</h4>
          <div style={chartStyle}>
            <BarChart />
          </div>
        </div>
        <div style={card}>
          <h4>Tren Kerusakan Aset Bulanan</h4>
          <div style={chartStyle}>
            <LineChart />
          </div>
        </div>
      </div>
    </div>
  );
}
