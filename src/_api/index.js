// src/_api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // <--- GANTI KE BACKEND KAMU
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
