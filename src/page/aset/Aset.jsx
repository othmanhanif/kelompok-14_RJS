// Aset.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import FormTambahAset from "./FormTambahAset";

const StatBox = ({ title, value, color, icon, bgColor }) => (
  <div style={{
    flex: 1,
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
    border: "1px solid #e2e8f0"
  }}>
    <div style={{
      width: "40px",
      height: "40px",
      borderRadius: "12px",
      backgroundColor: bgColor || "#f1f5f9",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px"
    }}>{icon}</div>
    <div>
      <div style={{ fontSize: "14px", color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: "20px", fontWeight: "bold", color }}>{value}</div>
    </div>
  </div>
);

const mapAset = (it) => ({
  id: it.id_asets,
  name_asets: it.name_asets,
  kd_gudang: it.kd_gudang,
  tipe_aset: it.tipe_aset,
  serial_number: it.serial_number,
  harga: it.harga,
  inout_aset: it.inout_aset,
  tanggal_perolehan: it.tanggal_perolehan,
  spec: it.spec || "-",
  cover_photo: it.cover_photo,
  id_kat_aset: it.id_kat_aset,
  id_user: it.id_user,
  gambar: it.cover_photo ? `http://localhost:8000/storage/${it.cover_photo}` : null,
  deskripsi: it.spec || "-",
  nama_aset: it.name_asets,
  kode_gudang: it.kd_gudang,
  tipe: it.tipe_aset,
  status: it.inout_aset === "in" ? "In" : "Out",
  tanggal: it.tanggal_perolehan,
});

const Aset = () => {
  const [search, setSearch] = useState("");
  const [asets, setAsets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAset, setEditingAset] = useState(null);
  const [detailAset, setDetailAset] = useState(null);

  useEffect(() => {
    const savedSearch = localStorage.getItem("search");
    if (savedSearch) setSearch(savedSearch);
    fetchAsets();
  }, []);

  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  const fetchAsets = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/assets");
      const data = Array.isArray(res.data) ? res.data.map(mapAset) : [];
      setAsets(data);
    } catch (err) {
      console.error("Gagal mengambil data aset:", err);
    }
  };

  const handleAddAsetBaru = (newData) => {
    const mapped = mapAset(newData);
    setAsets(prev => [mapped, ...prev]);
    setShowForm(false);
  };

  const handleEdit = (data) => {
    setEditingAset(data);
    setShowForm(true);
  };

  const handleUpdate = (updatedData) => {
    const updatedMapped = mapAset(updatedData);
    setAsets(prev => prev.map(a => a.id === updatedMapped.id ? updatedMapped : a));
    setEditingAset(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Yakin ingin menghapus aset ini?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8000/api/assets/${id}`);
      setAsets(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      alert("Gagal menghapus aset.");
      console.error("Gagal menghapus aset:", error);
    }
  };

  const filteredAsets = asets.filter(it =>
    it.nama_aset.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    totalAset: asets.length,
    asetMasuk: asets.filter(a => a.status === "In").length,
    asetKeluar: asets.filter(a => a.status === "Out").length,
    totalNilai: asets.reduce((acc, cur) => acc + Number(cur.harga || 0), 0)
  };

  const exportToCSV = () => {
    const header = [
      "Nama Aset",
      "Kode Gudang",
      "Tipe",
      "Serial Number",
      "Harga",
      "Status",
      "Tanggal",
      "Deskripsi"
    ];

    const rows = filteredAsets.map(item => [
      item.nama_aset,
      item.kode_gudang,
      item.tipe,
      item.serial_number,
      item.harga,
      item.status,
      item.tanggal,
      item.deskripsi
    ]);

    const csvContent = [header, ...rows]
      .map(e => e.map(field => `"${String(field).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `data_aset_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: "24px" }}>
      {!showForm ? (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <input
              type="text"
              placeholder="Cari aset..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "240px",
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                fontSize: "14px"
              }}
            />
            <div>
              <button style={exportButton} onClick={exportToCSV}>⤓ Export</button>
              <button style={addButton} onClick={() => { setEditingAset(null); setShowForm(true); }}>+ Tambah Aset</button>
            </div>
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <StatBox title="Total Aset" value={stats.totalAset} color="#1e3a8a" icon="📦" bgColor="#e0e7ff" />
            <StatBox title="Aset Masuk" value={stats.asetMasuk} color="#059669" icon="⬇" bgColor="#d1fae5" />
            <StatBox title="Aset Keluar" value={stats.asetKeluar} color="#dc2626" icon="⬆" bgColor="#fee2e2" />
            <StatBox title="Total Nilai" value={`Rp ${(stats.totalNilai / 1_000_000).toFixed(1)}M`} color="#f59e0b" icon="💰" bgColor="#fef3c7" />
          </div>

          <table style={{ width: "100%", borderCollapse: "collapse", borderRadius: "8px", overflow: "hidden", backgroundColor: "#fff" }}>
            <thead>
              <tr style={{ backgroundColor: "#f9fafb", textAlign: "left" }}>
                <th style={thStyle}>Aset</th>
                <th style={thStyle}>Kode Gudang</th>
                <th style={thStyle}>Tipe</th>
                <th style={thStyle}>Serial Number</th>
                <th style={thStyle}>Harga</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Tanggal</th>
                <th style={thStyle}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAsets.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #e5e7eb" }}>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={item.gambar || "/default.png"} alt={item.nama_aset} style={{ width: "40px", height: "40px", borderRadius: "8px", objectFit: "cover" }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{item.nama_aset}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>{item.deskripsi}</div>
                      </div>
                    </div>
                  </td>
                  <td style={tdStyle}>{item.kode_gudang}</td>
                  <td style={tdStyle}>{item.tipe}</td>
                  <td style={tdStyle}>{item.serial_number}</td>
                  <td style={tdStyle}>Rp {Number(item.harga).toLocaleString()}</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      backgroundColor: item.status === "In" ? "#d1fae5" : "#fee2e2",
                      color: item.status === "In" ? "#059669" : "#dc2626",
                      fontSize: "12px"
                    }}>{item.status}</span>
                  </td>
                  <td style={tdStyle}>{item.tanggal}</td>
                  <td style={tdStyle}>
                    <span onClick={() => setDetailAset(item)} style={{ marginRight: 8, cursor: "pointer" }}>👁️</span>
                    <span onClick={() => handleEdit(item)} style={{ marginRight: 8, cursor: "pointer" }}>✏️</span>
                    <span onClick={() => handleDelete(item.id)} style={{ cursor: "pointer" }}>🗑️</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <FormTambahAset
          onSubmit={editingAset ? handleUpdate : handleAddAsetBaru}
          onCancel={() => { setShowForm(false); setEditingAset(null); }}
          defaultData={editingAset}
        />
      )}

      {detailAset && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ background: "#fff", padding: "24px", borderRadius: "12px", maxWidth: 500, width: "100%" }}>
            <h2>Detail Aset</h2>
            <p><strong>Nama:</strong> {detailAset.nama_aset}</p>
            <p><strong>Kode Gudang:</strong> {detailAset.kode_gudang}</p>
            <p><strong>Tipe:</strong> {detailAset.tipe}</p>
            <p><strong>Serial Number:</strong> {detailAset.serial_number}</p>
            <p><strong>Harga:</strong> Rp {Number(detailAset.harga).toLocaleString()}</p>
            <p><strong>Status:</strong> {detailAset.status}</p>
            <p><strong>Tanggal:</strong> {detailAset.tanggal}</p>
            <p><strong>Deskripsi:</strong> {detailAset.deskripsi}</p>
            {detailAset.gambar && <img src={detailAset.gambar} alt="Aset" style={{ width: "100%", borderRadius: "8px" }} />}
            <button style={{ marginTop: "16px" }} onClick={() => setDetailAset(null)}>Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = { padding: "12px", fontSize: "14px", fontWeight: "600", color: "#475569", borderBottom: "1px solid #e5e7eb" };
const tdStyle = { padding: "12px", fontSize: "14px", color: "#334155" };
const addButton = {
  padding: "10px 16px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
  marginLeft: "8px"
};
const exportButton = {
  padding: "10px 16px",
  backgroundColor: "#22c55e",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer"
};

export default Aset;
