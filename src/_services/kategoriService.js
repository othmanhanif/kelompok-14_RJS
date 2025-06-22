import API from "../_api";

export const createKategori = async (payload) => {
  const response = await API.post("/kategori-aset", payload);
  return response.data;
};

export const getKategori = async () => {
  const response = await API.get("/kategori-aset");
  return response.data;
};

export const deleteKategori = async (id) => {
  const response = await API.delete(`/kategori-aset/${id}`);
  return response.data;
};

export const getKategoriById = async (id) => {
    const response = await API.get(`/kategori-aset/${id}`);
    return response.data;
  };
  
  export const updateKategori = async (id, payload) => {
    const response = await API.put(`/kategori-aset/${id}`, payload);
    return response.data;
  };
  