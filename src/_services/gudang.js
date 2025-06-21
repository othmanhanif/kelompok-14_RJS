import api from "../_api"; // axios instance

export const getGudangs = async () => {
  const res = await api.get("/gudangs"); // ✅ gunakan GET
  return res.data;
};
