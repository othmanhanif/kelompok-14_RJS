import React, { useState, useEffect, useRef } from "react";
import { fetchKategoriAset, fetchGudang, createAset, updateAset } from "../../_services/asetService";
import axios from "axios";

const FormTambahAset = ({ onCancel, onSubmit, currentUserId, defaultData }) => {
  const [formData, setFormData] = useState({
    name_asets: "",
    tanggal_perolehan: "",
    kd_gudang: "",
    id_kat_aset: "",
    serial_number: "",
    harga: "",
    spec: "",
    id_user: currentUserId || 1,
    cover_photo: null,
    inout_aset: "", // <== tidak default ke "in"
  });

  const [kategoriOptions, setKategoriOptions] = useState([]);
  const [gudangOptions, setGudangOptions] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadKategoriAset();
    loadGudang();

    if (defaultData) {
      setFormData({
        name_asets: defaultData.name_asets || "",
        tanggal_perolehan: defaultData.tanggal || "",
        kd_gudang: defaultData.kd_gudang || "",
        id_kat_aset: defaultData.id_kat_aset?.toString() || "",
        serial_number: defaultData.serial_number || "",
        harga: Number(defaultData.harga || 0).toLocaleString("id-ID").replace(/,/g, "."),
        spec: defaultData.spec || "",
        id_user: defaultData.id_user || currentUserId || 1,
        cover_photo: null,
        inout_aset: defaultData.inout_aset || "",
      });

      if (defaultData.gambar) {
        setPreviewImage(defaultData.gambar);
      }
    }
  }, [defaultData]);

  const loadKategoriAset = async () => {
    try {
      const data = await fetchKategoriAset();
      const options = data.map((item) => ({
        value: item.id_kat_aset.toString(),
        label: item.kat_aset,
      }));
      setKategoriOptions([{ value: "", label: "-- Pilih Kategori --" }, ...options]);
    } catch (error) {
      console.error("Gagal mengambil kategori aset:", error);
    }
  };

  const loadGudang = async () => {
    try {
      const data = await fetchGudang();
      const options = data.map((item) => ({
        value: item.kd_gudang,
        label: `${item.kd_gudang} - ${item.nama_gudang}`,
      }));
      setGudangOptions([{ value: "", label: "-- Pilih Gudang --" }, ...options]);
    } catch (error) {
      console.error("Gagal mengambil data gudang:", error);
    }
  };

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

  const handleHargaChange = (e) => {
    let val = e.target.value;
    if (/^[0-9.]*$/.test(val)) {
      const cleanNumber = val.replace(/\./g, "");
      const formatted = cleanNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      setFormData((fd) => ({ ...fd, harga: formatted }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((fd) => ({ ...fd, cover_photo: null }));
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_kat_aset || !formData.kd_gudang || !formData.inout_aset) {
      alert("Kategori, Gudang, dan Status Aset wajib dipilih!");
      return;
    }

    if (!formData.cover_photo && !defaultData) {
      alert("Cover photo wajib diupload!");
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === "id_kat_aset") {
          data.append(key, parseInt(value));
        } else if (key === "harga") {
          const hargaClean = value.replace(/\./g, "");
          data.append(key, parseInt(hargaClean));
        } else if (value !== null) {
          data.append(key, value);
        }
      }
      let response;
      if (defaultData) {
        response = await updateAset(defaultData.id, data);
      } else {
        response = await createAset(data);
      }
      onSubmit(response.data);
      resetForm();
    } catch (error) {
      console.error("Gagal simpan:", error.response?.data || error.message);
      alert("Gagal simpan: " + JSON.stringify(error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name_asets: "",
      tanggal_perolehan: "",
      kd_gudang: "",
      id_kat_aset: "",
      serial_number: "",
      harga: "",
      spec: "",
      id_user: currentUserId || 1,
      cover_photo: null,
      inout_aset: "",
    });
    setPreviewImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>{defaultData ? "✏️ Edit Aset" : "➕ Tambah Aset"}</h2>
      <div style={styles.grid}>
        <div style={styles.columnLeft}>
          <LabelInput label="Nama Aset" name="name_asets" value={formData.name_asets} onChange={handleChange} required />
          <DropdownInput label="Kode Gudang" name="kd_gudang" value={formData.kd_gudang} onChange={handleChange} options={gudangOptions} required />
          <DropdownInput label="Kategori Aset" name="id_kat_aset" value={formData.id_kat_aset} onChange={handleChange} options={kategoriOptions} required />
          <DropdownInput
            label="Status Aset"
            name="inout_aset"
            value={formData.inout_aset}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "-- Pilih Status --" },
              { value: "in", label: "In" },
              { value: "out", label: "Out" },
              { value: "service", label: "Service" },
              { value: "bap", label: "BAP" },
            ]}
          />
          <LabelInput label="Serial Number" name="serial_number" value={formData.serial_number} onChange={handleChange} />
          <LabelInput label="Harga" name="harga" value={formData.harga} onChange={handleHargaChange} required prefix="Rp" />
        </div>

        <div style={styles.columnRight}>
          <LabelInput label="Tanggal Perolehan" name="tanggal_perolehan" type="date" value={formData.tanggal_perolehan} onChange={handleChange} max={today} required />
          <div style={{ marginBottom: 16 }}>
            <label style={styles.label}>Foto Cover *</label>
            {!previewImage ? (
              <div style={styles.uploadBox} onClick={() => fileInputRef.current.click()}>
                <input ref={fileInputRef} type="file" name="cover_photo" accept="image/*" onChange={handleChange} style={{ display: "none" }} />
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
              style={{
                ...styles.input,
                height: 80,
                borderColor: formData.spec ? "#2563eb" : "#d1d5db",
                backgroundColor: formData.spec ? "#eff6ff" : "transparent"
              }}
              placeholder="Masukkan spesifikasi..."
              required
            />
          </div>
        </div>
      </div>

      <div style={styles.footer}>
        <button type="button" onClick={onCancel} style={styles.cancelBtn}>✖ Batal</button>
        <button type="submit" style={styles.submitBtn} disabled={loading}>
          {loading ? "⏳ Menyimpan..." : defaultData ? "💾 Update Aset" : "💾 Simpan Aset"}
        </button>
      </div>
    </form>
  );
};

// Reusable Components
const LabelInput = ({ label, name, value, onChange, required, type = "text", prefix, max }) => {
  const inputStyle = {
    ...styles.input,
    paddingLeft: prefix ? 32 : 12,
    borderColor: value ? "#2563eb" : "#d1d5db",
    backgroundColor: value ? "#eff6ff" : "transparent",
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.label}>{label}{required && <span style={{ color: "red" }}> *</span>}</label>
      <div style={{ position: "relative" }}>
        {prefix && <span style={styles.prefix}>{prefix}</span>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          max={max}
          style={inputStyle}
          required={required}
        />
      </div>
    </div>
  );
};

const DropdownInput = ({ label, name, value, onChange, options, required }) => {
  const inputStyle = {
    ...styles.input,
    borderColor: value ? "#2563eb" : "#d1d5db",
    backgroundColor: value ? "#eff6ff" : "transparent",
  };

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={styles.label}>{label}{required && <span style={{ color: "red" }}> *</span>}</label>
      <select name={name} value={value} onChange={onChange} style={inputStyle} required={required}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

// Styling
const styles = {
  form: { backgroundColor: "#fff", padding: 24, borderRadius: 12, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" },
  title: { fontSize: 20, marginBottom: 16, fontWeight: "bold", color: "#111827" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 },
  columnLeft: { display: "flex", flexDirection: "column", paddingRight: 10 },
  columnRight: { display: "flex", flexDirection: "column", paddingLeft: 10 },
  label: { marginBottom: 6, fontWeight: 600, color: "#374151", fontSize: 14 },
  input: {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: "1px solid #d1d5db", fontSize: 14, appearance: "none", outline: "none",
    transition: "border-color 0.2s ease, background-color 0.2s ease"
  },
  prefix: { position: "absolute", top: "50%", left: 10, transform: "translateY(-50%)", fontSize: 14, color: "#6b7280" },
  uploadBox: { border: "2px dashed #cbd5e1", borderRadius: 8, padding: 20, textAlign: "center", cursor: "pointer" },
  imagePreviewContainer: { position: "relative", display: "inline-block", marginTop: 8 },
  previewImage: { width: 100, borderRadius: 8, border: "1px solid #d1d5db" },
  removeBtn: {
    position: "absolute", top: -6, right: -6, backgroundColor: "#ef4444",
    color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, cursor: "pointer"
  },
  footer: { display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 },
  cancelBtn: {
    padding: "10px 16px", backgroundColor: "#f9fafb",
    border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer"
  },
  submitBtn: {
    padding: "10px 16px", backgroundColor: "#2563eb",
    color: "#fff", border: "none", borderRadius: 8, cursor: "pointer"
  },
};

export default FormTambahAset;
