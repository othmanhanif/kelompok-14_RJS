import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPeminjam } from "../../../_services/peminjam";
import { getGudangs } from "../../../_services/gudang"; // ⬅️ Tambahkan ini
import { FaTimes, FaUndo, FaSave } from "react-icons/fa";

export default function PeminjamCreate() {
  const initialFormState = {
    nik_karyawan: "",
    nama_karyawan: "",
    kd_gudang: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [gudangs, setGudangs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchGudangs() {
      try {
        const data = await getGudangs(); // ⬅️ Gunakan function yang benar
        setGudangs(Array.isArray(data) ? data : []); // ⬅️ Validasi array
      } catch (error) {
        console.error("Gagal memuat gudang:", error);
      }
    }

    fetchGudangs();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPeminjam(form);
      navigate("/peminjams");
    } catch (err) {
      alert("Gagal menambahkan data!");
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
  };

  return (
    <div className="max-w-xl p-6 mx-auto bg-white border shadow-lg rounded-xl border-slate-200">
      <div className="flex items-center gap-3 pb-4 mb-6 border-b">
        <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-blue-600 bg-blue-100 rounded-full">
          +
        </div>
        <div className="flex-1 text-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Tambah Peminjam
          </h2>
          <p className="text-sm text-slate-500">
            Silakan isi data karyawan yang meminjam Aset.
          </p>
        </div>
      </div>

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

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 transition bg-gray-100 rounded text-slate-700 hover:bg-gray-200"
          >
            <FaUndo /> Reset
          </button>
          <button
            type="button"
            onClick={() => navigate("/peminjams")}
            className="flex items-center gap-2 px-4 py-2 text-red-600 transition bg-red-100 rounded hover:bg-red-200"
          >
            <FaTimes /> Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            <FaSave /> Simpan
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
