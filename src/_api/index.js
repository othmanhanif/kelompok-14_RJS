import axios from "axios";


const API = axios.create({
  baseURL:"http://127.0.0.1:8000/api",
});

import axios from "axios";


const API = axios.create({
  baseURL:"http://127.0.0.1:8000/api",
});


// ✅ Interceptor request: Tambahkan token secara otomatis
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

// ✅ Tambahkan interceptor untuk menyisipkan token secara otomatis
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

export default API
