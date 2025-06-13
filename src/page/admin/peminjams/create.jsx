import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPeminjam } from "../../../_services/peminjam";
import { FaTimes, FaUndo, FaSave } from "react-icons/fa";

export default function PeminjamCreate() {
  const initialFormState = {
    nik_karyawan: "",
    nama_karyawan: "",
    kd_gudang: "",
  };

  const [form, setForm] = useState(initialFormState);
  const navigate = useNavigate();

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
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-lg border border-slate-200">
      {/* Header dengan ikon */}
      <div className="mb-6 flex items-center gap-3 border-b pb-4">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xl font-bold">
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
        <Input
          label="Kode Gudang"
          name="kd_gudang"
          value={form.kd_gudang}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded bg-gray-100 text-slate-700 hover:bg-gray-200 transition"
          >
            <FaUndo /> Reset
          </button>
          <button
            type="button"
            onClick={() => navigate("/peminjams")}
            className="flex items-center gap-2 px-4 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <FaTimes /> Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        {...props}
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  );
}
