import API from "../_api"; // axios instance dengan baseURL

export const getPegawai = async () => {
  // Bebas akses tanpa token
  const { data } = await API.get("/users");
  return data.data;
};

// Akses khusus untuk admin (perlu token)
export const getPegawaiById = async (id) => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data.data;
};

export const createPegawai = async (userData) => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.post("/users", userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const updatePegawai = async (id, updatedData) => {
  const token = localStorage.getItem("authToken");
  const { data } = await API.put(`/users/${id}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  return data;
};

export const deletePegawai = async (id) => {
  const token = localStorage.getItem("authToken");
  await API.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};
