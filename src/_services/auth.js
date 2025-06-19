import API from "../_api";

// Login: kirim email dan password, simpan token di localStorage
export const login = async (credentials) => {
  const { data } = await API.post("/login", credentials);
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

// Logout: kirim permintaan POST dengan Authorization Bearer token
export const logout = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Tidak ada token untuk logout");

  await API.post("/logout", null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem("token");
};
