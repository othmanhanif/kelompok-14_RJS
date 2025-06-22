import React, { useEffect, useState } from "react";
import { getAsetMasuk } from "../../../_services/asetMasuk";
import { getPeminjam } from "../../../_services/peminjam";
import Select from "react-select";
import { createTrxAsetIn } from "../../../_services/trxAset";

export default function AsetMasuk() {
  const [asets, setAsets] = useState([]);
  const [peminjamOptions, setPeminjamOptions] = useState([]);
  const [selectedTipe, setSelectedTipe] = useState("");
  const [searchSerial, setSearchSerial] = useState("");
  const [selectedAset, setSelectedAset] = useState(null);
  const [selectedPeminjam, setSelectedPeminjam] = useState(null);
  const [selectedLokasi, setSelectedLokasi] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalPurpose, setModalPurpose] = useState("");

  const itemsPerPage = 5;

  const lokasiOptions = [
    { value: "office", label: "Office" },
    { value: "operational", label: "Operational" },
    { value: "vum", label: "VUM" },
    { value: "logistik", label: "Logistik" },
  ];

  useEffect(() => {
    fetchAset();
    fetchPeminjam();
  }, []);

  const fetchAset = async () => {
    try {
      const data = await getAsetMasuk();
      setAsets(data);
    } catch (error) {
      console.error("Gagal ambil data aset:", error);
    }
  };

  const fetchPeminjam = async () => {
    try {
      const data = await getPeminjam();
      const options = data.map((item) => ({
        value: item.id_peminjam,
        label: `(${item.nik_karyawan}) ${item.nama_karyawan}`,
      }));
      setPeminjamOptions(options);
    } catch (error) {
      console.error("Gagal ambil data peminjam:", error);
    }
  };

  const filteredAsets = asets.filter((item) => {
    const matchesTipe = selectedTipe ? item.tipe_aset === selectedTipe : true;
    const matchesSerial = item.serial_number
      .toLowerCase()
      .includes(searchSerial.toLowerCase());
    return matchesTipe && matchesSerial;
  });

  const uniqueTypes = [...new Set(asets.map((item) => item.tipe_aset))];
  const totalPages = Math.ceil(filteredAsets.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = filteredAsets.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleOpenModal = (aset, purpose) => {
    setSelectedAset(aset);
    setModalPurpose(purpose);
  };

  const handleCloseModal = () => {
    setSelectedAset(null);
    setSelectedPeminjam(null);
    setSelectedLokasi("");
    setModalPurpose("");
  };

  const handleSubmitTrx = async (status) => {
    if (selectedAset && selectedPeminjam && selectedLokasi) {
      const payload = {
        kd_cabang: selectedAset.kd_gudang,
        name_asset: selectedAset.name_asets,
        tipe_asset: selectedAset.tipe_aset,
        serial_number: selectedAset.serial_number,
        kd_aktiva: selectedAset.kd_aktiva || "-",
        lokasi: selectedLokasi,
        id_peminjam: selectedPeminjam.value,
        id_asets: selectedAset.id_asets,
        trx_status: status === "pinjam" ? "out" : status,
      };
  
      console.log("Payload yang dikirim ke server:", payload);
  
      try {
        await createTrxAsetIn(payload);
        alert(`Transaksi berhasil disimpan (${status}) untuk aset ${selectedAset.name_asets}.`);
        handleCloseModal();
        fetchAset();
      } catch (error) {
        console.error("Error simpan transaksi:", error);
        if (error.response?.data) {
          console.error("Respons server (422):", error.response.data);
          alert("Gagal simpan transaksi: " + JSON.stringify(error.response.data));
        } else {
          alert("Gagal simpan transaksi: " + error.message);
        }
      }
    } else {
      alert("Silakan pilih peminjam dan lokasi terlebih dahulu.");
    }
  };
  

  return (
    <div style={{ padding: "20px", fontFamily: "Inter, sans-serif" }}>
      {/* Filter */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Data Aset Tersedia</h2>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Select
            options={[{ value: "", label: "Semua Tipe Aset" }, ...uniqueTypes.map((tipe) => ({ value: tipe, label: tipe }))]}
            value={selectedTipe ? { value: selectedTipe, label: selectedTipe } : { value: "", label: "Semua Tipe Aset" }}
            onChange={(selected) => setSelectedTipe(selected.value)}
            placeholder="Pilih Tipe Aset"
            styles={{
              control: (base) => ({ ...base, borderRadius: "8px", fontSize: "14px", minWidth: "200px" }),
            }}
          />
          <input
            type="text"
            placeholder="Cari Serial Number..."
            value={searchSerial}
            onChange={(e) => setSearchSerial(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", minWidth: "200px" }}
          />
        </div>
      </div>

      {/* Tabel Aset */}
      <div style={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc" }}>
              <th style={thStyle}>NO.</th>
              <th style={thStyle}>Nama Aset</th>
              <th style={thStyle}>Tipe</th>
              <th style={thStyle}>Serial Number</th>
              <th style={thStyle}>Kode Gudang</th>
              <th style={thStyle}>Tanggal Perolehan</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr key={item.id_asets} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb" }}>
                <td style={tdStyle}>{startIdx + index + 1}</td>
                <td style={tdStyle}>{item.name_asets}</td>
                <td style={tdStyle}>{item.tipe_aset}</td>
                <td style={tdStyle}>{item.serial_number}</td>
                <td style={tdStyle}>{item.kd_gudang}</td>
                <td style={tdStyle}>{item.tanggal_perolehan}</td>
                <td style={{ ...tdStyle, display: "flex", gap: "6px" }}>
                  <button onClick={() => handleOpenModal(item, "pinjam")} style={{ ...actionButtonStyle, backgroundColor: "#10b981" }}>Pinjam</button>
                  <button onClick={() => handleOpenModal(item, "service")} style={{ ...actionButtonStyle, backgroundColor: "#facc15", color: "#1e293b" }}>Service</button>
                  <button onClick={() => handleOpenModal(item, "bap")} style={{ ...actionButtonStyle, backgroundColor: "#3b82f6" }}>BAP</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Menampilkan {startIdx + 1}–{Math.min(startIdx + itemsPerPage, filteredAsets.length)} dari {filteredAsets.length}
          </span>
          <div style={{ display: "flex", gap: "4px" }}>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} style={pageBtn}>Previous</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => handlePageChange(i + 1)} style={{ ...pageBtn, backgroundColor: currentPage === i + 1 ? "#007bff" : "#f1f5f9", color: currentPage === i + 1 ? "#fff" : "#0f172a" }}>
                {i + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} style={pageBtn}>Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAset && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h3 style={{ marginBottom: "16px", fontSize: "18px" }}>
              Transaksi Aset - {modalPurpose.toUpperCase()}
            </h3>
            <p><strong>Nama Aset:</strong> {selectedAset.name_asets}</p>
            <p><strong>Serial:</strong> {selectedAset.serial_number}</p>

            <div style={{ margin: "16px 0" }}>
              <label style={labelStyle}>Pilih Peminjam:</label>
              <Select options={peminjamOptions} value={selectedPeminjam} onChange={(val) => setSelectedPeminjam(val)} placeholder="Pilih peminjam" />
            </div>

            <div style={{ margin: "16px 0" }}>
              <label style={labelStyle}>Pilih Lokasi:</label>
              <Select options={lokasiOptions} value={lokasiOptions.find((opt) => opt.value === selectedLokasi)} onChange={(val) => setSelectedLokasi(val.value)} placeholder="Pilih lokasi" />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
              <button onClick={handleCloseModal} style={cancelButtonStyle}>Batal</button>
              <button onClick={() => handleSubmitTrx(modalPurpose)} style={submitButtonStyle}>Konfirmasi</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const thStyle = {
  padding: "12px",
  fontWeight: 600,
  color: "#475569",
  borderBottom: "1px solid #e2e8f0",
  textAlign: "left",
};
const tdStyle = { padding: "10px", color: "#0f172a" };
const pageBtn = {
  padding: "6px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  background: "#f1f5f9",
  color: "#0f172a",
  fontSize: "13px",
  cursor: "pointer",
};
const actionButtonStyle = {
  color: "white",
  border: "none",
  borderRadius: "6px",
  padding: "6px 12px",
  fontSize: "13px",
  cursor: "pointer",
};
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalContentStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "12px",
  maxWidth: "400px",
  width: "100%",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};
const labelStyle = { marginBottom: "6px", display: "block", fontWeight: 500 };
const cancelButtonStyle = {
  padding: "6px 12px",
  background: "#e5e7eb",
  border: "none",
  borderRadius: "6px",
};
const submitButtonStyle = {
  padding: "6px 12px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
};
