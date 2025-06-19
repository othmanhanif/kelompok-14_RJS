import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaHashtag,
  FaWarehouse,
  FaMapMarkerAlt,
  FaUndo,
  FaSave,
  FaMap,
} from 'react-icons/fa';

export default function TambahGudang() {
  const { id } = useParams();
  const isEdit = Boolean(id && id !== 'undefined');
  const navigate = useNavigate();

  const [form, setForm] = useState({
    kd_gudang: '',
    nama_gudang: '',
    alamat_gudang: '',
    koordinat: '',
    status: 'Aktif',
  });

  useEffect(() => {
    if (isEdit) {
      fetch(`http://127.0.0.1:8000/api/gudang/${id}`)
        .then((res) => res.json())
        .then((data) => {
          // Cek apakah data perlu diakses melalui key misalnya: data.data
          if (data && data.kd_gudang) {
            setForm(data);
          } else if (data.data) {
            setForm(data.data); // Jika API Laravel pakai resource
          } else {
            console.warn('Format data tidak dikenali:', data);
          }
        })
        .catch((err) => {
          console.error('Gagal fetch gudang:', err);
          alert('Data tidak ditemukan');
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/gudang${isEdit ? `/${id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error('Gagal menyimpan gudang');

      alert(isEdit ? 'Gudang berhasil diupdate' : 'Gudang berhasil ditambahkan');
      navigate('/Gudang');
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  const handleReset = () => {
    setForm({
      kd_gudang: '',
      nama_gudang: '',
      alamat_gudang: '',
      koordinat: '',
      status: 'Aktif',
    });
  };

  const handleDetectLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setForm((prev) => ({ ...prev, koordinat: `${latitude}, ${longitude}` }));
      },
      (err) => {
        console.error('Gagal mendapatkan lokasi:', err);
        alert('Tidak dapat mendeteksi lokasi');
      }
    );
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="rounded-2xl border border-gray-300 shadow-sm p-6">
        <div className="mb-6 border-b pb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaWarehouse className="text-blue-600" /> Informasi Gudang
          </h2>
          <p className="text-sm text-gray-600">
            Lengkapi form berikut untuk {isEdit ? 'mengedit' : 'menambah'} gudang
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Kode Gudang<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="kd_gudang"
                  value={form.kd_gudang}
                  onChange={handleChange}
                  required
                  maxLength={4}
                  placeholder="Contoh: G001"
                  className="w-full border rounded-lg px-4 py-2 pl-10 text-sm"
                />
                <FaHashtag className="absolute top-3 left-3 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Maksimal 4 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Nama Gudang<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="nama_gudang"
                  value={form.nama_gudang}
                  onChange={handleChange}
                  required
                  maxLength={45}
                  placeholder="Contoh: Gudang Utama"
                  className="w-full border rounded-lg px-4 py-2 pl-10 text-sm"
                />
                <FaWarehouse className="absolute top-3 left-3 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 mt-1">Maksimal 45 karakter</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Alamat Gudang<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                name="alamat_gudang"
                value={form.alamat_gudang}
                onChange={handleChange}
                required
                maxLength={45}
                placeholder="Contoh: Jl. Raya No. 123, Jakarta"
                className="w-full border rounded-lg px-4 py-2 pl-10 text-sm"
              />
              <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Maksimal 45 karakter</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Koordinat (Latitude, Longitude)
            </label>
            <div className="relative">
              <input
                name="koordinat"
                value={form.koordinat}
                onChange={handleChange}
                maxLength={45}
                placeholder="Klik tombol maps →"
                className="w-full border rounded-lg px-4 py-2 pl-10 text-sm"
              />
              <FaMapMarkerAlt className="absolute top-3 left-3 text-gray-400" />
              <button
                type="button"
                onClick={handleDetectLocation}
                className="absolute top-2 right-2 text-xs text-blue-500 hover:underline"
              >
                <FaMap className="inline mr-1" /> Maps
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Format: latitude, longitude (maks. 45 karakter)
            </p>
          </div>

          <div className="flex justify-between gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/Gudang')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm"
            >
              ← Kembali
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border rounded-lg text-sm"
              >
                <FaUndo /> Reset
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
              >
                <FaSave /> Simpan Gudang
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
