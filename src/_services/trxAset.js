// src/_services/trxAset.js
import API from "../_api";

export const createTrxAsetIn = async (trxData) => {
  const response = await API.post("/trx-aset-in", trxData);
  return response.data;
};
