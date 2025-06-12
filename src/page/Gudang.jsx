import React from 'react';
import { FaWarehouse, FaHashtag, FaBuilding, FaMapMarkerAlt, FaSave, FaUndo, FaArrowLeft } from 'react-icons/fa';

const Gudang = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', color: '#0f172a' }}>
      
      {/* Breadcrumb */}
      <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>
        Dashboard &gt; Gudang &gt; <span style={{ color: '#0f172a', fontWeight: 500 }}>Tambah Gudang</span>
      </div>

      {/* Form Card */}
      <div style={{
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        
        {/* Form Header */}
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
            <FaWarehouse style={{ color: '#007bff', fontSize: '24px' }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px' }}>Informasi Gudang</h2>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Lengkapi form berikut untuk menambah gudang baru
            </p>
          </div>
        </div>

        <form>
          {/* Grid 2 kolom untuk Kode Gudang & Nama Gudang */}
          <div style={{ display: 'flex', gap: '16px' }}>
            {/* Kode Gudang */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Kode Gudang<span style={{ color: 'red' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="Contoh: G001" maxLength={4} style={inputStyle} />
                <FaHashtag style={inputIconStyle} />
              </div>
              <small style={smallStyle}>Maksimal 4 karakter</small>
            </div>

            {/* Nama Gudang */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Nama Gudang<span style={{ color: 'red' }}>*</span></label>
              <div style={{ position: 'relative' }}>
                <input type="text" placeholder="Contoh: Gudang Utama" maxLength={45} style={inputStyle} />
                <FaBuilding style={inputIconStyle} />
              </div>
              <small style={smallStyle}>Maksimal 45 karakter</small>
            </div>
          </div>

          {/* Alamat Gudang */}
          <div style={{ marginTop: '16px' }}>
            <label style={labelStyle}>Alamat Gudang</label>
            <div style={{ position: 'relative' }}>
              <textarea placeholder="Contoh: Jl. Raya No. 123, Jakarta Selatan" maxLength={45} rows={3} style={textareaStyle}></textarea>
              <FaMapMarkerAlt style={textareaIconStyle} />
            </div>
            <small style={smallStyle}>Maksimal 45 karakter</small>
          </div>

          {/* Koordinat */}
          <div style={{ marginTop: '16px' }}>
            <label style={labelStyle}>Koordinat (Latitude, Longitude)</label>
            <div style={{ position: 'relative' }}>
              <input type="text" placeholder="Contoh: -6.2088, 106.8456" maxLength={45} style={inputStyle} />
              <FaMapMarkerAlt style={inputIconStyle} />
            </div>
            <small style={smallStyle}>Opsional - Format: latitude, longitude (maksimal 45 karakter)</small>
          </div>

          {/* Button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px' }}>
            <button type="button" style={btnBack}><FaArrowLeft /> Kembali</button>
            <div>
              <button type="reset" style={btnReset}><FaUndo /> Reset</button>
              <button type="submit" style={btnSubmit}><FaSave /> Simpan Gudang</button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

// Style reusable
const labelStyle = { fontSize: '14px', fontWeight: 500, marginBottom: '4px', display: 'block' };
const inputStyle = { width: '100%', padding: '10px 36px 10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' };
const textareaStyle = { width: '100%', padding: '10px 36px 10px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' };
const inputIconStyle = { position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' };
const textareaIconStyle = { position: 'absolute', right: '12px', top: '12px', color: '#94a3b8' };
const smallStyle = { fontSize: '12px', color: '#64748b', marginTop: '4px', display: 'block' };
const btnBack = { background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', marginRight: '8px', cursor: 'pointer' };
const btnReset = { background: '#f1f5f9', color: '#0f172a', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', marginRight: '8px', cursor: 'pointer' };
const btnSubmit = { background: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 16px', fontSize: '14px', cursor: 'pointer' };

export default Gudang;
