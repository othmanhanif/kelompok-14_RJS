import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardMenu from '../components/CardMenu';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/api/dashboard')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Gagal mengambil data dashboard:', error);
      });
  }, []);

  const wrapper = {
    height: 'calc(100vh - 100px)',
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

  if (!data) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  return (
    <div style={wrapper}>
      <CardMenu data={data} />

      <div style={gridTwo}>
        <div style={card}>
          <h4>Status Aset Keseluruhan</h4>
          <div style={chartStyle}>
            <PieChart
              data={Object.entries(data.status_aset).map(([label, value]) => ({ label, value }))}
            />
          </div>
        </div>
        <div style={card}>
          <h4>Proporsi Aset Dipinjam</h4>
          <div style={chartStyle}>
            <PieChart
              data={[
                { label: 'Dipinjam', value: data.proporsi_dipinjam.dipinjam },
                { label: 'Tersedia', value: data.proporsi_dipinjam.tersedia },
              ]}
            />
          </div>
        </div>
      </div>

      <div style={gridTwo}>
        <div style={card}>
          <h4>Distribusi Kerusakan Aset per Kategori</h4>
          <div style={chartStyle}>
            <BarChart data={data.kerusakan_per_kategori} />
          </div>
        </div>
        <div style={card}>
          <h4>Tren Kerusakan Aset Bulanan</h4>
          <div style={chartStyle}>
            <LineChart data={data.tren_bulanan} />
          </div>
        </div>
      </div>
    </div>
  );
}
