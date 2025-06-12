import React from 'react';
import { FaChartBar, FaArrowLeft, FaUndo, FaSave } from 'react-icons/fa';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PieChart from '../components/PieChart';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
      
      {/* Breadcrumb */}
      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        Dashboard &gt; Gudang &gt; <span style={{ color: '#0f172a', fontWeight: 500 }}>Statistik Gudang</span>
      </div>

      {/* Card */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '1100px',
        margin: '0 auto'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#e6f0ff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px'
          }}>
            <FaChartBar style={{ color: '#007bff', fontSize: '24px' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Statistik Gudang</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Menampilkan data visualisasi aset berdasarkan gudang
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
          <div style={chartBoxStyle}>
            <h3 style={chartTitleStyle}>Perkembangan Aset (Line)</h3>
            <LineChart />
          </div>
          <div style={chartBoxStyle}>
            <h3 style={chartTitleStyle}>Distribusi Kategori (Pie)</h3>
            <PieChart />
          </div>
          <div style={{ ...chartBoxStyle, flex: '1 1 100%' }}>
            <h3 style={chartTitleStyle}>Total Aset per Gudang (Bar)</h3>
            <BarChart />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
          <button type="button" style={btnBack}><FaArrowLeft /> Kembali</button>
          <div>
            <button type="reset" style={btnReset}><FaUndo /> Reset</button>
            <button type="submit" style={btnSubmit}><FaSave /> Simpan Statistik</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const chartBoxStyle = {
  flex: '1 1 calc(50% - 8px)',
  backgroundColor: '#f8fafc',
  borderRadius: '12px',
  padding: '16px',
  border: '1px solid #e2e8f0'
};

const chartTitleStyle = {
  fontSize: '14px',
  fontWeight: 500,
  marginBottom: '12px'
};

const btnBack = {
  background: '#f1f5f9',
  color: '#0f172a',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '10px 16px',
  fontSize: '14px',
  marginRight: '8px',
  cursor: 'pointer'
};

const btnReset = {
  background: '#f1f5f9',
  color: '#0f172a',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '10px 16px',
  fontSize: '14px',
  marginRight: '8px',
  cursor: 'pointer'
};

const btnSubmit = {
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '10px 16px',
  fontSize: '14px',
  cursor: 'pointer'
};

export default Dashboard;
