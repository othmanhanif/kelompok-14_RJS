import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

const FormTambahAset = ({ onCancel, onSubmit, currentUserId }) => {
  const [formData, setFormData] = useState({
    name_asets: "",
    tanggal_perolehan: "",
    tipe_aset: "",
    kd_gudang: "",
    id_kat_aset: "",
    serial_number: "",
    harga: "",
    spec: "",
    id_user: 1, // default awal
    cover_photo: null,
    inout_aset: "in",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Update id_user jika currentUserId berubah
  useEffect(() => {
    if (currentUserId) {
      setFormData((fd) => ({ ...fd, id_user: currentUserId }));
    }
  }, [currentUserId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((fd) => ({ ...fd, [name]: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((fd) => ({ ...fd, [name]: value }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((fd) => ({ ...fd, cover_photo: null }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cover_photo) {
      alert("Cover photo wajib diupload!");
      return;
    }
    if (!formData.id_user) {
      alert("User belum login / id_user kosong");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }

      const res = await axios.post(
        "http://localhost:8000/api/assets",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Response success:", res.data);
      // onSubmit(res.data.data); // Notifikasi sukses ke parent
      onSubmit(res.data);
      console.log("Parsed asset:", res.data);

      // Reset form
      setFormData({
        name_asets: "",
        tanggal_perolehan: "",
        tipe_aset: "",
        kd_gudang: "",
        id_kat_aset: "",
        serial_number: "",
        harga: "",
        spec: "",
        id_user: currentUserId || "", // pertahankan user login
        cover_photo: null,
        inout_aset: "in",
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setPreviewImage(null);
    } catch (error) {
      if (error.response) {
        console.error("Gagal simpan:", error.response.data);
        alert("Gagal simpan: " + JSON.stringify(error.response.data));
      } else if (error.request) {
        console.error("Tidak ada respons dari server:", error.request);
        alert("Gagal simpan: Tidak ada respons dari server.");
      } else {
        console.error("Error saat membuat permintaan:", error.message);
        alert("Gagal simpan: " + error.message);
      }
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>➕ Tambah Aset</h2>
      <div style={styles.grid}>
        {/* Kolom kiri */}
        <div style={styles.column}>
          <LabelInput label="Nama Aset" name="name_asets" value={formData.name_asets} onChange={handleChange} required />
          <LabelInput label="Tipe Aset" name="tipe_aset" value={formData.tipe_aset} onChange={handleChange} required />
          <LabelInput label="Kode Gudang" name="kd_gudang" value={formData.kd_gudang} onChange={handleChange} required />
          <DropdownInput
            label="Kategori Aset"
            name="id_kat_aset"
            value={formData.id_kat_aset}
            onChange={handleChange}
            options={[
              { value: "", label: "-- Pilih Kategori --" },
              { value: 1, label: "Elektronik" },
              { value: 2, label: "Peralatan Kantor" },
            ]}
            required
          />
          <LabelInput label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} />
          <LabelInput label="Harga" name="harga" type="number" value={formData.harga} onChange={handleChange} required prefix="Rp" />
        </div>

        {/* Kolom kanan */}
        <div style={styles.column}>
          <LabelInput
            label="Tanggal Perolehan"
            name="tanggal_perolehan"
            type="date"
            value={formData.tanggal_perolehan}
            onChange={handleChange}
            max={today}
            required
          />
          <DropdownInput
            label="Status Aset"
            name="inout_aset"
            value={formData.inout_aset}
            onChange={handleChange}
            options={[
              { value: "in", label: "Masuk" },
              { value: "out", label: "Keluar" },
            ]}
            required
          />
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Foto Cover *</label>
            {!previewImage ? (
              <div style={styles.uploadBox} onClick={() => fileInputRef.current.click()}>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="cover_photo"
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
                <div style={{ textAlign: "center", color: "#6b7280" }}>
                  <div style={{ fontSize: "24px" }}>📤</div>
                  <div>Klik untuk upload atau drag & drop</div>
                </div>
              </div>
            ) : (
              <div style={styles.imagePreviewContainer}>
                <img src={previewImage} alt="Preview" style={styles.previewImage} />
                <button type="button" onClick={handleRemoveImage} style={styles.removeBtn}>×</button>
              </div>
            )}
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Spesifikasi *</label>
            <textarea
              name="spec"
              value={formData.spec}
              onChange={handleChange}
              style={{ ...styles.input, height: 80 }}
              placeholder="Masukkan spesifikasi..."
              required
            />
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>✖ Batal</button>
        <button type="submit" style={styles.submitBtn} disabled={loading}>
          {loading ? "⏳ Menyimpan..." : "💾 Simpan Aset"}
        </button>
      </div>
    </form>
  );
};

const LabelInput = ({ label, name, value, onChange, required, type = "text", prefix, max }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={styles.label}>
      {label}
      {required && <span style={{ color: "red" }}> *</span>}
    </label>
    <div style={{ position: "relative" }}>
      {prefix && <span style={styles.prefix}>{prefix}</span>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        max={max}
        style={{ ...styles.input, paddingLeft: prefix ? 32 : 12 }}
        required={required}
      />
    </div>
  </div>
);

const DropdownInput = ({ label, name, value, onChange, options, required }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={styles.label}>
      {label}
      {required && <span style={{ color: "red" }}> *</span>}
    </label>
    <select name={name} value={value} onChange={onChange} style={styles.input} required={required}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const styles = {
  form: { backgroundColor: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  title: { fontSize: 20, marginBottom: 16, fontWeight: "bold", color: "#111827" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  column: { display: "flex", flexDirection: "column" },
  label: { marginBottom: 6, fontWeight: 600, color: "#374151", fontSize: 14 },
  input: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 },
  prefix: { position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", fontSize: 14, color: "#6b7280" },
  uploadBox: { border: "2px dashed #cbd5e1", borderRadius: 8, padding: 20, textAlign: "center", cursor: "pointer" },
  imagePreviewContainer: { position: "relative", display: "inline-block", marginTop: 8 },
  previewImage: { width: 100, borderRadius: 8, border: "1px solid #d1d5db" },
  removeBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 20,
    height: 20,
    cursor: "pointer"
  },
  footer: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 },
  cancelBtn: {
    padding: "10px 16px",
    backgroundColor: "#f9fafb",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    cursor: "pointer"
  },
  submitBtn: {
    padding: "10px 16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer"
  },
};

export default FormTambahAset;
