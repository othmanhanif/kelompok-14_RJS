import api from "../_api"; // axios instance

export const kembalikanAset = async (id_trx) => {
  const res = await api.post("/aset-keluar", { id_trx });
  return res.data;
};

export const getAsetKeluar = async (status = "out") => {
  const response = await api.get(`/aset-keluar?status=${status}`);
  return response.data;
};
