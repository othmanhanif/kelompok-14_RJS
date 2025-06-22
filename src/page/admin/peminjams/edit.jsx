import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPeminjamById, updatePeminjam } from "../../../_services/peminjam";
import { getGudangs } from "../../../_services/gudang";

export default function PeminjamEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nik_karyawan: "",
    nama_karyawan: "",
    kd_gudang: "",
  });

  const [gudangs, setGudangs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data peminjam dan gudang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [peminjamData, gudangData] = await Promise.all([
          getPeminjamById(id),
          getGudangs(),
        ]);
        setForm(peminjamData);
        setGudangs(Array.isArray(gudangData) ? gudangData : []);
      } catch (err) {
        alert("Gagal mengambil data!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePeminjam(id, form);
      navigate("/peminjams");
    } catch (err) {
      alert("Gagal mengupdate data!");
    }
  };

  if (loading) {
    return <div className="py-10 text-center">Memuat data...</div>;
  }

  return (
    <div className="max-w-xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h2 className="mb-6 text-2xl font-semibold text-slate-800">Edit Data Peminjam</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="NIK Karyawan"
          name="nik_karyawan"
          value={form.nik_karyawan}
          onChange={handleChange}
        />
        <Input
          label="Nama Karyawan"
          name="nama_karyawan"
          value={form.nama_karyawan}
          onChange={handleChange}
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-slate-700">
            Kode Gudang
          </label>
          <select
            name="kd_gudang"
            value={form.kd_gudang}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm transition border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Pilih Kode Gudang</option>
            {gudangs.map((gudang) => (
              <option key={gudang.kd_gudang} value={gudang.kd_gudang}>
                {gudang.kd_gudang}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate("/peminjams")}
            className="px-4 py-2 transition bg-gray-100 rounded text-slate-700 hover:bg-gray-200"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-3 py-2 text-sm transition border rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
