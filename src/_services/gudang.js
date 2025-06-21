import API from "../_api"; // Axios instance dengan baseURL

// ✅ Ambil semua gudang (bisa semua role, tapi tetap butuh token login)
export const getGudang = async () => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.get("/gudang", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data.data;
};

// ✅ Ambil gudang berdasarkan ID (khusus admin)
export const getGudangById = async (id) => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.get(`/gudang/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data.data;
};

// ✅ Tambah gudang baru (khusus admin)
export const createGudang = async (payload) => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.post("/gudang", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

// ✅ Update gudang (khusus admin)
export const updateGudang = async (id, updatedData) => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.put(`/gudang/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

// ✅ Hapus gudang (khusus admin)
export const deleteGudang = async (id) => {
  const token = localStorage.getItem("authToken");
  await API.delete(`/gudang/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
