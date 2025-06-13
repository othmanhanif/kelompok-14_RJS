import React, { useEffect, useState } from "react";
import { getPeminjam } from "../../../_services/peminjam";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { deletePeminjam } from "../../../_services/peminjam";

export default function AdminPeminjam() {
  const [peminjam, setPeminjam] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPeminjam();
        setPeminjam(data);
      } catch (error) {
        console.error("Error fetching peminjam:", error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getPeminjam();
    setPeminjam(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus peminjam ini?")) {
      try {
        await deletePeminjam(id);
        fetchData(); // Refresh data setelah delete
      } catch (error) {
        alert("Gagal menghapus data!");
      }
    }
  };

  // Pagination Logic
  const totalPages = Math.ceil(peminjam.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentData = peminjam.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Inter, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Data Peminjam</h2>
        <Link
          to="/peminjams/create"
          style={{
            display: "flex",
            alignItems: "center",
            background: "#007bff",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            textDecoration: "none",
          }}
        >
          <FaPlus style={{ marginRight: "8px" }} /> Tambah Peminjam
        </Link>
      </div>

      {/* Table container */}
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "24px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          maxWidth: "100%",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", textAlign: "left" }}>
              <th style={thStyle}>NO.</th>
              <th style={thStyle}>NIK Karyawan</th>
              <th style={thStyle}>Nama Karyawan</th>
              <th style={thStyle}>Kode Gudang</th>
              <th style={thStyleCenter}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => (
              <tr
                key={item.id_peminjam}
                style={{
                  backgroundColor: index % 2 === 0 ? "#fff" : "#f9fafb",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <td style={tdStyle}>{startIdx + index + 1}</td>
                <td style={tdStyle}>{item.nik_karyawan}</td>
                <td style={tdStyle}>{item.nama_karyawan}</td>
                <td style={tdStyle}>{item.kd_gudang}</td>
                <td style={tdStyleCenter}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Link
                      to={`/peminjams/${item.id_peminjam}/edit`}
                      style={iconButton("#facc15", "#000")}
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item.id_peminjam)}
                      style={iconButton("#ef4444", "#fff")}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#64748b" }}>
            Showing {startIdx + 1}–
            {Math.min(startIdx + itemsPerPage, peminjam.length)} of{" "}
            {peminjam.length}
          </span>

          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={pageBtn}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  ...pageBtn,
                  backgroundColor:
                    currentPage === i + 1 ? "#007bff" : "#f1f5f9",
                  color: currentPage === i + 1 ? "#fff" : "#0f172a",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={pageBtn}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable styles
const thStyle = {
  padding: "12px",
  fontWeight: 600,
  color: "#475569",
  borderBottom: "1px solid #e2e8f0",
};
const thStyleCenter = { ...thStyle, textAlign: "center" };
const tdStyle = { padding: "10px", color: "#0f172a" };
const tdStyleCenter = { ...tdStyle, textAlign: "center" };
const iconButton = (bg, color) => ({
  backgroundColor: bg,
  color: color,
  border: "none",
  padding: "8px",
  borderRadius: "6px",
  cursor: "pointer",
});
const pageBtn = {
  padding: "6px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  background: "#f1f5f9",
  color: "#0f172a",
  fontSize: "13px",
  cursor: "pointer",
};
