import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTags, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { getKategoriById, updateKategori } from "../../_services/kategoriService";


const EditKategoriAset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [katAset, setKatAset] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKategoriById(id);
        setKatAset(data.kat_aset);
      } catch (error) {
        console.error("Gagal fetch data kategori:", error);
        toast.error("Gagal mengambil data kategori");
        navigate("/kategori-aset");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!katAset.trim()) {
      toast.warn("Nama kategori tidak boleh kosong");
      return;
    }

    try {
      await updateKategori(id, { kat_aset: katAset });
      toast.success("Kategori berhasil diperbarui");
      setTimeout(() => navigate("/kategori-aset"), 800);
    } catch (error) {
      console.error("Gagal update kategori:", error);
      toast.error("Gagal memperbarui kategori");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={iconWrapperStyle}>
            <FaTags style={{ color: "#007bff", fontSize: "24px" }} />
          </div>
          <h2 style={{ margin: 0, fontSize: "18px" }}>Edit Kategori Aset</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
              Nama Kategori<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Contoh: Elektronik"
              maxLength={25}
              value={katAset}
              onChange={(e) => setKatAset(e.target.value)}
              style={inputStyle}
              required
            />
            <small style={smallStyle}>Maksimal 25 karakter</small>
          </div>

          <div style={actionStyle}>
            <button
              type="button"
              style={btnBack}
              onClick={() => navigate("/kategori-aset")}
            >
              <MdCancel /> Batal
            </button>
            <button type="submit" style={btnSubmit}>
              <FaSave /> Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: "20px",
  fontFamily: "Inter, sans-serif",
  color: "#0f172a",
};

const cardStyle = {
  backgroundColor: "#fff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  maxWidth: "600px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  marginBottom: "24px",
};

const iconWrapperStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  backgroundColor: "#e6f0ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "16px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "4px",
  display: "block",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  fontSize: "14px",
  boxSizing: "border-box",
};

const smallStyle = {
  fontSize: "12px",
  color: "#64748b",
  marginTop: "4px",
  display: "block",
};

const actionStyle = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  marginTop: "32px",
};

const baseBtnStyle = {
  padding: "12px 16px",
  fontSize: "14px",
  borderRadius: "8px",
  display: "inline-flex",
  alignItems: "center",
  gap: "9px",
  cursor: "pointer",
};

const btnBack = {
  ...baseBtnStyle,
  backgroundColor: "#f1f5f9",
  color: "#0f172a",
  border: "1px solid #e2e8f0",
};

const btnSubmit = {
  ...baseBtnStyle,
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
};

export default EditKategoriAset;
