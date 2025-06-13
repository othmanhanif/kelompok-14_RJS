import React, { useState } from "react";
import axios from "axios";

const FormTambahAset = ({ onCancel, onSubmit }) => {
  const [formData, setFormData] = useState({
    name_asets: "",
    tanggal_perolehan: "",
    tipe_aset: "",
    kd_gudang: "",
    id_kat_aset: "",
    serial_number: "",
    harga: "",
    spec: "",
    id_user: "", // bisa diisi dari sesi login jika ada
    cover_photo: null,
    inout_aset: "in",
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviewImage(reader.result);
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, cover_photo: null });
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:8000/api/aset", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSubmit(); // trigger update in parent
    } catch (error) {
      console.error("Gagal menyimpan aset:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.header}>
        <span style={styles.icon}>➕</span>
        <h2 style={styles.title}>Form Tambah Aset</h2>
      </div>

      <div style={styles.grid}>
        <div style={styles.column}>
          <LabelInput label="Nama Aset" name="name_asets" value={formData.name_asets} onChange={handleChange} required />
          <LabelInput label="Tipe Aset" name="tipe_aset" value={formData.tipe_aset} onChange={handleChange} required />
          <LabelInput label="Kode Gudang" name="kd_gudang" value={formData.kd_gudang} onChange={handleChange} required />
          <DropdownInput label="Kategori Aset" name="id_kat_aset" value={formData.id_kat_aset} onChange={handleChange} options={[
            { value: "", label: "-- Pilih Kategori --" },
            { value: 1, label: "Elektronik" },
            { value: 2, label: "Peralatan Kantor" },
          ]} required />
          <LabelInput label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} />
          <LabelInput label="Harga" name="harga" value={formData.harga} onChange={handleChange} required prefix="Rp" />
        </div>

        <div style={{ ...styles.column, borderLeft: "1px solid #e5e7eb", paddingLeft: 24 }}>
          <LabelInput label="Tanggal Perolehan" name="tanggal_perolehan" type="date" value={formData.tanggal_perolehan} onChange={handleChange} required />
          <DropdownInput label="Status Aset" name="inout_aset" value={formData.inout_aset} onChange={handleChange} options={[
            { value: "in", label: "Masuk" },
            { value: "out", label: "Keluar" },
          ]} required />

          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Foto Cover</label>
            {!previewImage ? (
              <div style={styles.uploadBox}>
                <input type="file" name="cover_photo" accept="image/*" onChange={handleChange} style={{ display: "none" }} id="upload" />
                <label htmlFor="upload" style={{ cursor: "pointer", display: "block" }}>
                  <div style={{ textAlign: "center", color: "#6b7280" }}>
                    <div style={{ fontSize: "24px" }}>📤</div>
                    <div>Klik untuk upload atau drag & drop</div>
                    <div style={{ fontSize: "12px", color: "#9ca3af" }}>PNG, JPG, JPEG hingga 2MB</div>
                  </div>
                </label>
              </div>
            ) : (
              <div style={styles.imagePreviewContainer}>
                <img src={previewImage} alt="Preview" style={styles.previewImage} />
                <button type="button" onClick={handleRemoveImage} style={styles.removeBtn}>×</button>
              </div>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Spesifikasi</label>
            <textarea name="spec" value={formData.spec} onChange={handleChange} style={{ ...styles.input, height: 80 }} placeholder="Masukkan spesifikasi..." />
          </div>

          <input type="hidden" name="id_user" value={formData.id_user} />
        </div>
      </div>

      <div style={styles.footer}>
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>✖ Batal</button>
        <button type="submit" style={styles.submitBtn}>💾 Simpan Aset</button>
      </div>
    </form>
  );
};

const LabelInput = ({ label, name, value, onChange, required, type = "text", prefix }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={styles.label}>{label}{required && <span style={{ color: "red" }}> *</span>}</label>
    <div style={{ position: "relative" }}>
      {prefix && <span style={styles.prefix}>{prefix}</span>}
      <input type={type} name={name} value={value} onChange={onChange} style={{ ...styles.input, paddingLeft: prefix ? 32 : 12 }} required={required} />
    </div>
  </div>
);

const DropdownInput = ({ label, name, value, onChange, options, required }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={styles.label}>{label}{required && <span style={{ color: "red" }}> *</span>}</label>
    <select name={name} value={value} onChange={onChange} style={styles.input} required={required}>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

const styles = {
  form: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
  },
  header: {
    background: "linear-gradient(to right, #3b82f6, #2563eb)",
    padding: 12,
    borderRadius: 8,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: { marginRight: 8, fontSize: 20 },
  title: { margin: 0, fontSize: 18, fontWeight: "bold" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 },
  column: { display: "flex", flexDirection: "column" },
  label: { display: "block", marginBottom: 6, fontWeight: 600, color: "#374151", fontSize: 14 },
  input: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid #d1d5db", fontSize: 14 },
  prefix: { position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", fontSize: 14, color: "#6b7280" },
  uploadBox: { border: "2px dashed #cbd5e1", borderRadius: 8, padding: "24px", textAlign: "center" },
  imagePreviewContainer: { position: "relative", display: "inline-block", marginTop: 8 },
  previewImage: { width: 100, borderRadius: 8, border: "1px solid #d1d5db" },
  removeBtn: { position: "absolute", top: -6, right: -6, backgroundColor: "#ef4444", border: "none", color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 14, cursor: "pointer", lineHeight: "20px", textAlign: "center", padding: 0 },
  footer: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 },
  cancelBtn: { padding: "10px 16px", backgroundColor: "#f9fafb", border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer" },
  submitBtn: { padding: "10px 16px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer" },
};

export default FormTambahAset;
