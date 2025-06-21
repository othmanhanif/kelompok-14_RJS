// src/_services/peminjam.js
import API from "../_api";

export const getPeminjam = async () => {
  const response = await API.get("/peminjam");
  return response.data.data;
};

export const getPeminjamById = async (id) => {
  const response = await API.get(`/peminjam/${id}`);
  return response.data.data;
};

export const createPeminjam = async (peminjamData) => {
  const response = await API.post("/peminjam", peminjamData);
  return response.data;
};

export const updatePeminjam = async (id, updatedData) => {
  const response = await API.put(`/peminjam/${id}`, updatedData);
  return response.data;
};

export const deletePeminjam = async (id) => {
  const response = await API.delete(`/peminjam/${id}`);
  return response.data;
};
