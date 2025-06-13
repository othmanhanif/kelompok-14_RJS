import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPeminjamById, updatePeminjam } from '../../../_services/peminjam';

export default function PeminjamEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nik_karyawan: '',
    nama_karyawan: '',
    kd_gudang: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeminjam = async () => {
      try {
        const data = await getPeminjamById(id);
        setForm(data);
      } catch (err) {
        alert('Gagal mengambil data peminjam!');
      } finally {
        setLoading(false);
      }
    };

    fetchPeminjam();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePeminjam(id, form);
      navigate('/peminjams');
    } catch (err) {
      alert('Gagal mengupdate data!');
    }
  };

  if (loading) {
    return <div className="text-center py-10">Memuat data...</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-slate-800">Edit Data Peminjam</h2>
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
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => navigate('/peminjams')}
            className="px-4 py-2 rounded bg-gray-100 text-slate-700 hover:bg-gray-200 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
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
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <input
        {...props}
        className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
      />
    </div>
  );
}
