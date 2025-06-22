import API from "../_api";
import axios from "axios";

// Ambil data kategori aset form gudang
export const fetchKategoriAset = async () => {
  const response = await axios.get("http://localhost:8000/api/kategori-aset");
  return response.data;
};

// Ambil data gudang
export const fetchGudang = async () => {
  const response = await axios.get("http://localhost:8000/api/gudang");
  return response.data;
};

// Ambil semua aset
export const fetchAsets = async () => {
  const response = await axios.get("http://localhost:8000/api/assets");
  return response.data;
};

// Hapus aset
export const deleteAset = async (id) => {
  return await axios.delete(`http://localhost:8000/api/assets/${id}`);
};

// Tambah aset
export const createAset = async (formData) => {
  return await axios.post("http://localhost:8000/api/assets", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

// Update aset
export const updateAset = async (id, formData) => {
  formData.append("_method", "PUT");
  return await axios.post(`http://localhost:8000/api/assets/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
