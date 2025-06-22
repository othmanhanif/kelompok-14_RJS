import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getGudang, deleteGudang } from '../_services/gudang';

export default function MainGudang() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await getGudang();
      setData(result);
    } catch (err) {
      console.error("Gagal memuat data gudang:", err);
      alert("Gagal memuat data gudang (mungkin belum login atau akses ditolak)");
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-gudang/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus gudang ini?")) return;
    try {
      await deleteGudang(id);
      alert("Gudang berhasil dihapus");
      setData(prev => prev.filter(item => item.id_gudang !== id));
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menghapus gudang");
    }
  };

  const cards = [
    { title: 'Total Gudang', value: data.length, icon: '🏢' },
    { title: 'Gudang Aktif', value: data.length, icon: '✅' },
  ];

  const filtered = data.filter(item =>
    item.nama_gudang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 h-screen overflow-y-auto bg-gray-50">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4">
        <input
          type="text"
          placeholder="Cari gudang..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 min-w-[250px]"
        />
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/tambah-gudang')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            <FaPlus /> Tambah Gudang
          </button>
        </div>
      </div>

      {/* Card Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {cards.map((card, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-4">
            <div className="text-sm text-gray-500">{card.title}</div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-xl">{card.icon}</div>
          </div>
        ))}
      </div>

      {/* Tabel Gudang */}
      <div className="mt-10">
        <h3 className="text-lg font-bold mb-4">Daftar Gudang</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-left text-sm">
              <tr>
                <th className="px-4 py-2">Kode Gudang</th>
                <th className="px-4 py-2">Nama Gudang</th>
                <th className="px-4 py-2">Alamat</th>
                <th className="px-4 py-2">Koordinat</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Dibuat</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((g, idx) => (
                <tr key={idx} className="border-t text-sm">
                  <td className="px-4 py-2">{g.kd_gudang}</td>
                  <td className="px-4 py-2">{g.nama_gudang}</td>
                  <td className="px-4 py-2">{g.alamat_gudang}</td>
                  <td className="px-4 py-2">{g.koordinat}</td>
                  <td className="px-4 py-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${g.status === 'Aktif' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {g.status || 'Aktif'}
                    </span>
                  </td>
                  <td className="px-4 py-2">{formatDate(g.created_at)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(g.id_gudang)} title="Edit Gudang">
                      <FaEdit className="text-green-500" />
                    </button>
                    <button onClick={() => handleDelete(g.id_gudang)} title="Hapus Gudang">
                      <FaTrash className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return d.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}
