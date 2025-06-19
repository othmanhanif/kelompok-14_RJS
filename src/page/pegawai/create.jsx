import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes, FaUndo, FaSave } from "react-icons/fa";
import { createPegawai } from "../../_services/pegawai";

export default function PegawaiCreate() {
  const initialFormState = {
    nik_user: "",
    nama_karyawan: "",
    email_karyawan: "",
    role: "",
    password_user: "",
    id_gudang: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Cek apakah user login dan role-nya admin
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!isLoggedIn || !user || user.role !== "admin") {
      alert("Akses ditolak. Halaman ini hanya untuk admin.");
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormValid = () => {
    return (
      form.nik_user &&
      form.nama_karyawan &&
      form.email_karyawan &&
      form.role &&
      form.password_user &&
      form.id_gudang
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Semua field wajib diisi.");
      return;
    }

    setIsLoading(true);
    try {
      await createPegawai(form);
      navigate("/pegawai");
    } catch (err) {
      alert("Gagal menambahkan data!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white border rounded-xl shadow">
      {/* Header */}
      <div className="mb-8 border-b pb-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-100 text-green-600 flex items-center justify-center rounded-full text-xl font-bold">
          +
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Tambah Pegawai</h2>
          <p className="text-sm text-slate-500">
            Isi data pegawai dengan lengkap dan benar.
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormGroup label="NIK">
          <Input name="nik_user" value={form.nik_user} onChange={handleChange} />
        </FormGroup>
        <FormGroup label="Nama Karyawan">
          <Input name="nama_karyawan" value={form.nama_karyawan} onChange={handleChange} />
        </FormGroup>
        <FormGroup label="Email">
          <Input
            name="email_karyawan"
            value={form.email_karyawan}
            onChange={handleChange}
            type="email"
          />
        </FormGroup>
        <FormGroup label="Role">
          <Input name="role" value={form.role} onChange={handleChange} />
        </FormGroup>
        <FormGroup label="Password">
          <Input
            name="password_user"
            value={form.password_user}
            onChange={handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup label="ID Gudang">
          <Input name="id_gudang" value={form.id_gudang} onChange={handleChange} />
        </FormGroup>

        {/* Tombol aksi */}
        <div className="md:col-span-2 flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            <FaUndo /> Reset
          </button>
          <button
            type="button"
            onClick={() => navigate("/pegawai")}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <FaTimes /> Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50"
          >
            <FaSave />
            {isLoading ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

function Input({ ...props }) {
  return (
    <input
      {...props}
      className="mt-1 block w-full max-w-xs rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
    />
  );
}
