// src/_api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // GANTI JIKA BACKEND BERBEDA
  headers: {
    "Content-Type": "application/json",
  },
});

//  Interceptor request: Tambahkan token Authorization dari localStorage
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
