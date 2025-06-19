import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPegawaiById, updatePegawai } from '../../_services/pegawai';
import { FaSave, FaTimes } from 'react-icons/fa';

export default function PegawaiEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nik_user: '',
    nama_karyawan: '',
    email_karyawan: '',
    role: '',
    password_user: '',
    id_gudang: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPegawai = async () => {
      try {
        const data = await getPegawaiById(id);
        const finalData = Array.isArray(data) ? data[0] : data; // handle array response
        setForm(finalData);
      } catch {
        alert('Gagal mengambil data pegawai!');
      } finally {
        setLoading(false);
      }
    };

    fetchPegawai();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePegawai(id, form);
      navigate('/pegawai');
    } catch {
      alert('Gagal mengupdate data!');
    }
  };

  if (loading) return <div className="text-center py-10 text-slate-600">Memuat data...</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white border rounded-xl shadow">
      {/* Header */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-slate-800">Edit Data Pegawai</h2>
        <p className="text-sm text-slate-500">Perbarui informasi pegawai di bawah ini.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormGroup label="NIK">
          <Input name="nik_user" value={form.nik_user} onChange={handleChange} />
        </FormGroup>
        <FormGroup label="Nama Karyawan">
          <Input name="nama_karyawan" value={form.nama_karyawan} onChange={handleChange} />
        </FormGroup>
        <FormGroup label="Email">
          <Input name="email_karyawan" value={form.email_karyawan} onChange={handleChange} type="email" />
        </FormGroup>
        <FormGroup label="Role">
          <Input name="role" value={form.role} onChange={handleChange} />
        </FormGroup>
        <FormGroup label="Password">
          <Input name="password_user" value={form.password_user} onChange={handleChange} type="password" />
        </FormGroup>
        <FormGroup label="ID Gudang">
          <Input name="id_gudang" value={form.id_gudang} onChange={handleChange} />
        </FormGroup>

        {/* Tombol aksi */}
        <div className="md:col-span-2 flex justify-end gap-2 pt-4">
          <button
            type="button"
            onClick={() => navigate('/pegawai')}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            <FaTimes /> Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <FaSave /> Simpan
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
