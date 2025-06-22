import React, { useEffect, useState } from "react";
import { getAsetKeluar, kembalikanAset } from "../../../_services/asetKeluar";

export default function AsetKeluar() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterNama, setFilterNama] = useState("");
  const [statusTab, setStatusTab] = useState("out"); // Default tab "out"

  useEffect(() => {
    setLoading(true);
    fetchAsetKeluar(statusTab); // akan auto-trigger di awal karena default statusTab = 'out'
  }, [statusTab]);

  const fetchAsetKeluar = async (status) => {
    try {
      console.log("Fetching status:", status); // ✅ Debug
      const result = await getAsetKeluar(status);
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Gagal mengambil data aset keluar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterNama(value);
    if (value === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        item.name_asets.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleKembalikan = async (id_trx) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin mengembalikan aset ini?"
    );
    if (!confirmed) return;

    try {
      await kembalikanAset(id_trx);
      alert("Aset berhasil dikembalikan.");
      fetchAsetKeluar(statusTab);
    } catch (error) {
      console.error("Gagal mengembalikan aset:", error);
      alert("Terjadi kesalahan saat mengembalikan aset.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Data Aset Keluar</h2>
      <br />

      {/* Tabs */}
      <div style={{ marginBottom: "16px" }}>
        {["out", "service"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusTab(status)}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: statusTab === status ? "#3b82f6" : "#e5e7eb",
              color: statusTab === status ? "#fff" : "#111827",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            {status === "out" ? "Pinjam" : "Service"}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div style={{ marginBottom: "20px" }}>
        <label
          htmlFor="filterNama"
          style={{ marginRight: "8px", fontWeight: "500" }}
        >
          Filter Nama Aset:
        </label>
        <select
          id="filterNama"
          value={filterNama}
          onChange={handleFilterChange}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            minWidth: "200px",
          }}
        >
          <option value="">-- Semua Aset --</option>
          {[...new Set(data.map((item) => item.name_asets))].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p>Memuat data...</p>
      ) : filteredData.length === 0 ? (
        <p>Tidak ada data aset keluar.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ccc",
            fontSize: "14px",
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#f1f5f9" }}>
            <tr>
              <th style={th}>No</th>
              <th style={th}>Nama Aset</th>
              <th style={th}>Tipe</th>
              <th style={th}>Serial Number</th>
              <th style={th}>
                {statusTab === "out" ? "Lokasi Pinjam" : "Lokasi Service"}
              </th>
              <th style={th}>NIK Peminjam</th>
              <th style={th}>Peminjam</th>
              <th style={th}>Tanggal Pinjam</th>
              <th style={th}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, i) => (
              <tr
                key={item.id_trx || item.id || i}
                style={{ borderBottom: "1px solid #e2e8f0" }}
              >
                <td style={td}>{i + 1}</td>
                <td style={td}>{item.name_asets}</td>
                <td style={td}>{item.tipe_aset}</td>
                <td style={td}>{item.serial_number}</td>
                <td style={td}>{item.lokasi}</td>
                <td style={td}>{item.nik_karyawan}</td>
                <td style={td}>{item.nama_karyawan}</td>
                <td style={td}>{item.tanggal_keluar}</td>
                <td style={{ ...td, textAlign: "center" }}>
                  <button
                    onClick={() => handleKembalikan(item.id_trx)}
                    style={{
                      backgroundColor: "#10b981",
                      color: "#fff",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    Kembali
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const th = {
  padding: "12px",
  textAlign: "left",
  fontWeight: "600",
  color: "#334155",
  borderBottom: "1px solid #ccc",
};

const td = {
  padding: "10px",
  color: "#0f172a",
};
