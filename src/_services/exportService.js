import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToExcel = (data, status) => {
  const worksheet = XLSX.utils.json_to_sheet(
    data.map(item => ({
      'Nama Aset': item.name_asset,
      'Kode Gudang': item.kd_cabang,
      'Tipe': item.kat_aset,
      'Serial Number': item.serial_number,
      'Status': item.trx_status.toUpperCase(),
      'Tanggal': item.tanggal_keluar?.split('T')[0] || '-',
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Aset');
  XLSX.writeFile(workbook, `laporan_aset_${status}.xlsx`);
};

export const exportToPDF = (data, status) => {
  const doc = new jsPDF();

  doc.text(`Laporan Aset (${status.toUpperCase()})`, 14, 10);

  const tableData = data.map(item => [
    item.name_asset,
    item.kd_cabang,
    item.tipe_asset,
    item.serial_number,
    item.trx_status.toUpperCase(),
    item.tanggal_keluar?.split('T')[0] || '-',
  ]);

  autoTable(doc, { 
    head: [['Nama Aset', 'Kode Gudang', 'Tipe', 'Serial Number', 'Status', 'Tanggal']],
    body: tableData,
    startY: 20,
  });

  doc.save(`laporan_aset_${status}.pdf`);
};
