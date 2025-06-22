import { useState } from "react";
import axios from "axios";

export default function Pinjam() {
  const [peminjam, setPeminjam] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const fetchPeminjam = async () => {
    setLoading(true);
    setError(null); // reset error
    try {
      const res = await axios.get("/api/peminjam");
      // ➜ Cek struktur respons Anda, jika data di dalam res.data.data maka:
      setPeminjam(res.data.data); 
    } catch (err) {
      setError("Gagal ambil data peminjam");
      console.error("Gagal ambil data peminjam:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchPeminjam}
        className="px-4 py-2 text-white bg-blue-600 rounded"
      >
        Ambil Data Peminjam
      </button>

      {loading && <p className="mt-2 text-blue-500">Memuat data...</p>}
      {error && <p className="mt-2 text-red-500">{error}</p>}

      {/* List Peminjam */}
      {peminjam.length > 0 && (
        <ul className="mt-4 list-disc list-inside">
          {peminjam.map((item) => (
            <li key={item.id} className="text-gray-800">
              {item.nik} — {item.nama}
            </li>
          ))}
        </ul>
      )}

      {/* Jika sudah klik tapi datanya kosong */}
      {(!loading && peminjam.length === 0 && !error) && (
        <p className="mt-4 text-gray-500">Belum ada data peminjam.</p>
      )}
    </div>
  );
}
