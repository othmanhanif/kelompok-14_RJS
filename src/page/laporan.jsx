import React, { useState, useEffect } from 'react';
import 'jspdf-autotable'
import { fetchLaporanGrouped, exportToExcel, exportToPDF } from '../_services/laporan';


const Laporan = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState({ in: 0, out: 0, service: 0, BAP: 0 });
  const [status, setStatus] = useState('in');

  useEffect(() => {
    fetchLaporanGrouped().then(res => {
      setData(res.data[status] || []);
      setTotal(res.total);
    });
  }, [status]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <select
          className="border rounded px-3 py-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="in">IN</option>
          <option value="out">OUT</option>
          <option value="service">SERVICE</option>
          <option value="BAP">BAP</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => exportToExcel(data, status)}
            className="bg-gray-200 text-sm px-4 py-2 rounded"
          >
            Export Excel
          </button>
          <button
            onClick={() => exportToPDF(data, status)}
            className="bg-gray-200 text-sm px-4 py-2 rounded"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        <StatBox title="Total Aset" value={total.in + total.out + total.service + total.BAP} color="bg-blue-100" />
        <StatBox title="Aset Masuk" value={total.in} color="bg-green-100" />
        <StatBox title="Aset Keluar" value={total.out} color="bg-red-100" />
        <StatBox title="Service" value={total.service} color="bg-yellow-100" />
        <StatBox title="BAP" value={total.BAP} color="bg-orange-100" />
      </div>

      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Aset</th>
              <th className="px-4 py-2 text-left">Kode Gudang</th>
              <th className="px-4 py-2 text-left">Tipe</th>
              <th className="px-4 py-2 text-left">Serial Number</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i} className="odd:bg-white even:bg-gray-50">
                <td className="px-4 py-2">{item.name_asset}</td>
                <td className="px-4 py-2">{item.kd_cabang}</td>
                <td className="px-4 py-2">{item.tipe_asset}</td>
                <td className="px-4 py-2">{item.serial_number}</td>
                <td className="px-4 py-2">
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    item.trx_status === 'in' ? 'bg-green-100 text-green-700' :
                    item.trx_status === 'out' ? 'bg-red-100 text-red-700' :
                    item.trx_status === 'service' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.trx_status.toUpperCase()}
                  </span>
                </td>
                <td className="px-4 py-2">{item.tanggal_keluar?.split('T')[0] || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatBox = ({ title, value, color }) => (
  <div className={`p-4 rounded shadow ${color}`}>
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-semibold">{value}</p>
  </div>
);

export default Laporan;