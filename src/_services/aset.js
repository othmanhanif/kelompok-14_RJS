import axios from "axios";

export const fetchKategori = async () => {
  const res = await axios.get("http://localhost:8000/api/kategori-aset");
  const map = {};
  res.data.forEach((kat) => {
    map[kat.id_kat_aset] = kat.kat_aset;
  });
  return map;
};

export const fetchAsets = async (kategoriMap) => {
  const res = await axios.get("http://localhost:8000/api/assets");
  const data = Array.isArray(res.data) ? res.data : [];
  return data.map((it) => ({
    id: it.id_asets,
    nama_aset: it.name_asets,
    kode_gudang: it.kd_gudang,
    tipe: kategoriMap[it.id_kat_aset] || "-",
    serial_number: it.serial_number,
    harga: it.harga,
    status: it.inout_aset === "in" ? "In" : "Out",
    tanggal: it.tanggal_perolehan,
    deskripsi: it.spec || "-",
    gambar: it.cover_photo ? `http://localhost:8000/storage/${it.cover_photo}` : null,
    id_kat_aset: it.id_kat_aset,
  }));
};

export const deleteAset = async (id) => {
  return await axios.delete(`http://localhost:8000/api/assets/${id}`);
};
