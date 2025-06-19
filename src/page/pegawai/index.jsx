import React, { useEffect, useState } from "react";
import { getPegawai, deletePegawai } from "../../_services/pegawai";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AdminPegawai() {
  const [pegawai, setPegawai] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getPegawai();
      // jika response.data adalah object { data: [...] }, ambil datanya
      const list = Array.isArray(response) ? response : response.data || [];
      setPegawai(list);
    } catch (error) {
      console.error("Error fetching pegawai:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus pegawai ini?")) {
      try {
        await deletePegawai(id);
        fetchData();
      } catch (error) {
        alert("Gagal menghapus data!");
      }
    }
  };

  const totalPages = Math.ceil(pegawai.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = pegawai.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 font-sans text-slate-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Data Pegawai</h2>
        <Link
          to="/pegawai/create"
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          <FaPlus className="mr-2" /> Tambah Pegawai
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-xl p-4 shadow">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-slate-100">
            <tr>
              <th className={thStyle}>NO.</th>
              <th className={thStyle}>NIK</th>
              <th className={thStyle}>Nama</th>
              <th className={thStyle}>Email</th>
              <th className={thStyle}>Role</th>
              <th className={thStyle}>ID Gudang</th>
              <th className={thStyleCenter}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.id_user}
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}
              >
                <td className={tdStyle}>{startIdx + index + 1}</td>
                <td className={tdStyle}>{item.nik_user}</td>
                <td className={tdStyle}>{item.nama_karyawan}</td>
                <td className={tdStyle}>{item.email_karyawan}</td>
                <td className={tdStyle}>{item.role}</td>
                <td className={tdStyle}>{item.id_gudang}</td>
                <td className={tdStyleCenter}>
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/pegawai/${item.id_user}/edit`}
                      className="bg-yellow-400 text-black px-2 py-1 rounded hover:bg-yellow-500"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id_user)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-slate-500">
            Menampilkan {startIdx + 1}–{Math.min(startIdx + itemsPerPage, pegawai.length)} dari {pegawai.length} data
          </span>

          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={pageBtn}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`${pageBtn} ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={pageBtn}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
const thStyle = "px-3 py-2 font-semibold text-slate-700 border-b";
const thStyleCenter = `${thStyle} text-center`;
const tdStyle = "px-3 py-2 text-slate-800";
const tdStyleCenter = `${tdStyle} text-center`;
const pageBtn =
  "px-3 py-1 border border-slate-300 rounded hover:bg-slate-100 text-sm";
