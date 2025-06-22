import API from "../_api"; // Axios instance dengan interceptor token

// Ambil semua gudang (semua role)
export const getGudang = async () => {
  const { data } = await API.get("/gudang");
  return data;
};

// Ambil gudang berdasarkan ID (admin)
export const getGudangById = async (id) => {
  const { data } = await API.get(`/gudang/${id}`);
  return data.data; // asumsi struktur: { data: {...} }
};

// Tambah gudang baru (admin)
export const createGudang = async (payload) => {
  const { data } = await API.post("/gudang", payload);
  return data;
};

// Update gudang (admin)
export const updateGudang = async (id, updatedData) => {
  const { data } = await API.put(`/gudang/${id}`, updatedData);
  return data;
};

// Hapus gudang (admin)
export const deleteGudang = async (id) => {
  await API.delete(`/gudang/${id}`);
};
