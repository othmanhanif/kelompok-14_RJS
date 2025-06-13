import API from "../_api"

export const getPeminjam = async () => {
  const { data } = await API.get("/peminjam");
  return data.data;
};

export const getPeminjamById = async (id) => {
  const { data } = await API.get(`/peminjam/${id}`);
  return data.data;
};

export const createPeminjam = async (peminjamData) => {
  const { data } = await API.post("/peminjam", peminjamData);
  return data;
};

export const updatePeminjam = async (id, updatedData) => {
  const { data } = await API.put(`/peminjam/${id}`, updatedData);
  return data;
};

export const deletePeminjam = async (id) => {
  await API.delete(`/peminjam/${id}`);
};
