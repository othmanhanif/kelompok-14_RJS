import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const KategoriAset = () => {
  const [kategori, setKategori] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi data dummy
    const dummyData = [
      { id_kategori_aset: 1, kat_aset: "Elektronik", quantity: 10 },
      { id_kategori_aset: 2, kat_aset: "Meubel", quantity: 7 },
      { id_kategori_aset: 3, kat_aset: "Kendaraan", quantity: 5 },
      { id_kategori_aset: 4, kat_aset: "ATK", quantity: 12 },
      { id_kategori_aset: 5, kat_aset: "Peralatan Dapur", quantity: 3 },
      { id_kategori_aset: 6, kat_aset: "Batu", quantity: 3 },
      { id_kategori_aset: 7, kat_aset: "Air", quantity: 100 },
    ];

    setTimeout(() => {
      setKategori(dummyData);
      setLoading(false);
    }, 500); // simulasi loading
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/kategori-aset", {
  //     headers: { Accept: "application/json" },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setKategori(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Gagal mengambil data kategori aset", err);
  //       setLoading(false);
  //     });
  // }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Yakin ingin menghapus data ini?");
    if (confirm) {
      const updated = kategori.filter((item) => item.id_kategori_aset !== id);
      setKategori(updated);

      // jaga agar currentPage tetap valid
      if (
        (currentPage - 1) * itemsPerPage >= updated.length &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredKategori = kategori.filter((item) =>
    item.kat_aset.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredKategori.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = filteredKategori.slice(startIndex, endIndex);

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          fontSize: "30px",
          fontWeight: "600",
          marginBottom: "12px",
          textAlign: "left",
        }}
      >
        Data Kategori Aset
      </h2>

      {/* Search + Tambah */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <input
          type="text"
          placeholder="Cari kategori..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "12px",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            fontSize: "14px",
            marginRight: "16px",
          }}
        />
        <button
          style={addButton}
          onClick={() => navigate("/kategori-aset/tambah")}
        >
          + Tambah Kategori
        </button>
      </div>

      {/* Tabel */}
      <div
        style={{
          overflowX: "auto",
          backgroundColor: "#fff",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
          }}
        >
          <thead style={{ backgroundColor: "#f9fafb" }}>
            <tr>
              <th style={thStyle}>No</th>
              <th style={thStyle}>Nama Kategori</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={tdStyle}>
                  Memuat data...
                </td>
              </tr>
            ) : currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" style={tdStyle}>
                  Tidak ada data ditemukan.
                </td>
              </tr>
            ) : (
              currentItems.map((item, index) => (
                <tr key={item.id_kategori_aset}>
                  <td style={tdStyle}>{startIndex + index + 1}</td>
                  <td style={tdStyle}>{item.kat_aset}</td>
                  <td style={tdStyle}>{item.quantity || 0}</td>
                  <td style={tdStyle}>
                    <div style={{ gap: "10px" }}>
                      <button style={btnEdit}>✏️</button>
                      <button
                        style={btnDelete}
                        onClick={() => handleDelete(item.id_kategori_aset)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan="4" style={{ ...tdStyle, padding: "16px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "14px",
                    color: "#64748b",
                    flexWrap: "wrap",
                  }}
                >
                  <span>
                    Showing {totalItems === 0 ? 0 : startIndex + 1}-{endIndex}{" "}
                    of {totalItems}
                  </span>

                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <button
                      style={paginationBtn}
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    >
                      Previous
                    </button>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <span>Page</span>
                      <input
                        type="number"
                        value={currentPage}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (!isNaN(val)) {
                            setCurrentPage(
                              Math.min(Math.max(val, 1), totalPages)
                            );
                          }
                        }}
                        style={{
                          width: "50px",
                          padding: "6px",
                          fontSize: "14px",
                          textAlign: "center",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                        }}
                      />
                      <span>of {totalPages}</span>
                    </div>

                    <button
                      style={paginationBtn}
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

// Styles
const thStyle = {
  padding: "15px",
  fontSize: "14px",
  fontWeight: "600",
  color: "#475569",
  borderBottom: "1px solid #e5e7eb",
};
const tdStyle = {
  padding: "12px",
  fontSize: "14px",
  color: "#334155",
  borderBottom: "1px solid #e2e8f0",
};
const btnEdit = {
  padding: "6px 10px",
  fontSize: "14px",
  marginRight: "8px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#fefce8",
  cursor: "pointer",
};
const btnDelete = {
  padding: "6px 10px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #fca5a5",
  backgroundColor: "#fee2e2",
  color: "#dc2626",
  cursor: "pointer",
};
const addButton = {
  padding: "10px 16px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  cursor: "pointer",
};
const paginationBtn = {
  padding: "6px 12px",
  borderRadius: "6px",
  backgroundColor: "#f1f5f9",
  border: "1px solid #e2e8f0",
  color: "#334155",
  cursor: "pointer",
};

export default KategoriAset;
