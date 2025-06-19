import React, { useState } from "react";
import { FaTags, FaHashtag, FaSave, FaArrowLeft } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const TambahKategoriAset = () => {
  const navigate = useNavigate();
  const [katAset, setKatAset] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulasi simpan
    console.log({ katAset, quantity });
    navigate("/kategori-aset");
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "#0f172a",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#e6f0ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "16px",
            }}
          >
            <FaTags style={{ color: "#007bff", fontSize: "24px" }} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "18px" }}>Form Kategori Aset</h2>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
              Nama Kategori<span style={{ color: "red" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Contoh: Elektronik"
                maxLength={25}
                value={katAset}
                onChange={(e) => setKatAset(e.target.value)}
                style={inputStyle}
                required
              />
              <FaHashtag style={inputIconStyle} />
            </div>
            <small style={smallStyle}>Maksimal 25 karakter</small>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>
              Quantity<span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="number"
              placeholder="Contoh: 10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={inputStyle}
              required
            />
            <small style={smallStyle}>Jumlah barang</small>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              marginTop: "32px",
            }}
          >
            <button
              type="button"
              style={btnBack}
              onClick={() => navigate("/kategori-aset")}
            >
              <MdCancel /> Batal
            </button>
            <button type="submit" style={btnSubmit}>
              <FaSave /> Simpan Kategori
            </button>
          </div>
        </form>
      </div>
    </div>
  );
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
const inputIconStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#94a3b8",
};
const smallStyle = {
  fontSize: "12px",
  color: "#64748b",
  marginTop: "4px",
  display: "block",
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
  marginRight: "340px"
};

const btnSubmit = {
  ...baseBtnStyle,
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
};

export default TambahKategoriAset;