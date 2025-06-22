import React, { useEffect, useState } from "react";
import { getAsetKeluar, kembalikanAset } from "../../../_services/asetKeluar";

export default function AsetKeluar() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterNama, setFilterNama] = useState("");
  const [statusTab, setStatusTab] = useState("out");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchPeminjam, setSearchPeminjam] = useState("");
  const labelMap = {
    out: "Lokasi Pinjam",
    service: "Lokasi Service",
    bap: "Lokasi BAP",
  };

  useEffect(() => {
    setLoading(true);
    fetchAsetKeluar(statusTab);
    setCurrentPage(1);
  }, [statusTab]);

  const fetchAsetKeluar = async (status) => {
    try {
      const result = await getAsetKeluar(status);
      setData(result);
      setFilteredData(result);
    } catch (error) {
      console.error("Gagal mengambil data aset keluar:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterNama(value);
    applyFilters(value, searchPeminjam);
  };

  const handleSearchPeminjamChange = (e) => {
    const value = e.target.value;
    setSearchPeminjam(value);
    applyFilters(filterNama, value);
  };

  const applyFilters = (namaFilter, peminjamFilter) => {
    let result = [...data];

    if (namaFilter !== "") {
      result = result.filter((item) =>
        item.name_asets.toLowerCase().includes(namaFilter.toLowerCase())
      );
    }

    if (peminjamFilter !== "") {
      result = result.filter((item) =>
        item.nama_karyawan.toLowerCase().includes(peminjamFilter.toLowerCase())
      );
    }

    setFilteredData(result);
    setCurrentPage(1);
  };

  const handleKembalikan = async (id_trx) => {
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin mengembalikan aset ini?"
    );
    if (!confirmed) return;

    try {
      await kembalikanAset(id_trx);
      alert("Aset berhasil dikembalikan.");
      fetchAsetKeluar(statusTab);
    } catch (error) {
      console.error("Gagal mengembalikan aset:", error);
      alert("Terjadi kesalahan saat mengembalikan aset.");
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-6 font-sans">
      <h2 className="mb-4 text-lg font-semibold">Data Aset Keluar</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {["out", "service", "bap"].map((status) => (
          <button
            key={status}
            onClick={() => setStatusTab(status)}
            className={`px-4 py-2 rounded-md font-medium ${
              statusTab === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {status === "out"
              ? "Pinjam"
              : status === "service"
              ? "Service"
              : "BAP"}
          </button>
        ))}
      </div>

      {/* Filter */}
      {/* Filter Section */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <label
            htmlFor="filterNama"
            style={{ marginRight: "8px", fontWeight: "500" }}
          >
            Filter Nama Aset:
          </label>
          <select
            id="filterNama"
            value={filterNama}
            onChange={handleFilterChange}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minWidth: "200px",
            }}
          >
            <option value="">-- Semua Aset --</option>
            {[...new Set(data.map((item) => item.name_asets))].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="searchPeminjam"
            style={{ marginRight: "8px", fontWeight: "500" }}
          >
            Cari Nama Peminjam:
          </label>
          <input
            id="searchPeminjam"
            type="text"
            placeholder="Masukkan nama peminjam"
            value={searchPeminjam}
            onChange={handleSearchPeminjamChange}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minWidth: "200px",
            }}
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Memuat data...</p>
      ) : currentItems.length === 0 ? (
        <p>Tidak ada data aset keluar.</p>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-md shadow-sm">
            <table className="min-w-full text-sm bg-white table-auto">
              <thead className="font-semibold bg-slate-100 text-slate-700">
                <tr>
                  <th className={th}>No</th>
                  <th className={th}>Nama Aset</th>
                  <th className={th}>Tipe</th>
                  <th className={th}>Serial Number</th>
                  <th className={th}>{labelMap[statusTab] || ""}</th>
                  <th className={th}>NIK Peminjam</th>
                  <th className={th}>Peminjam</th>
                  <th className={th}>Tanggal Pinjam</th>
                  <th className={th}>Aksi</th>
                </tr>
              </thead>
              <tbody className="text-slate-800">
                {currentItems.map((item, i) => (
                  <tr key={item.id_trx || item.id || i} className="border-b">
                    <td className={td}>{indexOfFirstItem + i + 1}</td>
                    <td className={td}>{item.name_asets}</td>
                    <td className={td}>{item.tipe_aset}</td>
                    <td className={td}>{item.serial_number}</td>
                    <td className={td}>{item.lokasi}</td>
                    <td className={td}>{item.nik_karyawan}</td>
                    <td className={td}>{item.nama_karyawan}</td>
                    <td className={td}>{item.tanggal_keluar}</td>
                    <td className={`${td} text-center`}>
                      <button
                        onClick={() => handleKembalikan(item.id_trx)}
                        className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-600"
                      >
                        Kembali
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Info */}
          <div className="mt-4 text-sm text-gray-600">
            Menampilkan {indexOfFirstItem + 1}–
            {Math.min(indexOfLastItem, filteredData.length)} dari{" "}
            {filteredData.length}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-end gap-2 mt-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={paginationButton(currentPage === 1)}
            >
              Previous
            </button>

            <button className={pageNumberButton(true)}>{currentPage}</button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={paginationButton(currentPage === totalPages)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const th = "px-4 py-3 text-left border-b";
const td = "px-4 py-2";

const paginationButton = (disabled) =>
  `px-3 py-1.5 border rounded-md text-sm ${
    disabled
      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }`;

const pageNumberButton = (active) =>
  `px-3 py-1.5 border rounded-md text-sm font-medium ${
    active
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-white text-gray-800 border-gray-300"
  }`;
