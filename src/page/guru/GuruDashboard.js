// src/page/guru/DashboardGuru.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineDeleteForever,MdEdit } from "react-icons/md";

const DashboardGuru = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const username = state.username;

  // Contoh data
  const soalPilihanGanda = [
    { soal: 'Apa warna langit?', kunciJawaban: 'Biru', jawaban: ['Biru', 'Hijau', 'Merah', 'Kuning'] },
    { soal: 'Apa ibukota Indonesia?', kunciJawaban: 'Jakarta', jawaban: ['Jakarta', 'Bandung', 'Surabaya', 'Medan'] },
    {
      soal: 'Apa yang dimaksud dengan ekosistem?',
      jawaban: [
        'Kumpulan individu sejenis yang hidup di suatu wilayah.',
        'Interaksi antara makhluk hidup dan lingkungan sekitarnya.',
        'Proses perpindahan energi dari satu makhluk hidup ke makhluk hidup lainnya.',
        'Tempat tinggal makhluk hidup yang spesifik.',
      ],
      kunciJawaban: 'Interaksi antara makhluk hidup dan lingkungan sekitarnya.',
    },
    {
      soal: 'Mana yang termasuk dalam komponen abiotik dalam ekosistem?',
      jawaban: [
        'Tumbuhan',
        'Hewan',
        'Matahari',
        'Bakteri',
      ],
      kunciJawaban: 'Matahari',
    },
  ];

  const soalEsai = [
    { soal: 'Apa yang dimaksud dengan ekosistem?', kunciJawaban: 'Ekosistem adalah sistem yang terdiri dari makhluk hidup dan lingkungan sekitarnya yang saling berinteraksi.' },
    { soal: 'Apa itu gravitasi?', kunciJawaban: 'Gravitasi adalah gaya tarik menarik antara benda yang memiliki massa.' }
  ];
  

  const handleEdit = (type, index) => {
    // Implementasi aksi edit
    alert(`Edit ${type} at index ${index}`);
  };

  const handleDelete = (type, index) => {
    // Implementasi aksi delete
    alert(`Delete ${type} at index ${index}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="bg-white shadow-md p-4 mb-6 rounded-md w-full max-w-full">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Guru</h1>
        {username && <p className="text-lg text-gray-600">Welcome, {username}!</p>}
      </header>
      
      {/* Tabel Soal Pilihan Ganda */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Soal Pilihan Ganda</h2>
          <button
            onClick={() => navigate('/tambah-pilihan-ganda')}
            className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Tambah Soal
          </button>
        </div>
        <table className="w-full bg-white shadow-md rounded-md border border-gray-200">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="p-4 text-left text-gray-600">Soal</th>

              <th className="p-4 text-left text-gray-600">Kunci Jawaban</th>
              <th className="p-4 text-left text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {soalPilihanGanda.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-4 text-gray-800">{item.soal}</td>
                <td className="p-4 text-gray-800">{item.kunciJawaban}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit('Pilihan Ganda', index)}
                    className="bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600 transition mr-2"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete('Pilihan Ganda', index)}
                    className="bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 transition"
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabel Soal Esai */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Soal Esai</h2>
          <button
            onClick={() => navigate('/tambah-essay')}
            className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            Tambah Soal
          </button>
        </div>
        <table className="w-full bg-white shadow-md rounded-md border border-gray-200">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="p-4 text-left text-gray-600">Soal</th>
              <th className="p-4 text-left text-gray-600">Kunci Jawaban</th>
              <th className="p-4 text-left text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {soalEsai.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="p-4 text-gray-800">{item.soal}</td>
                <td className="p-4 text-gray-800">{item.kunciJawaban}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit('Esai', index)}
                    className="bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600 transition mr-2"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => handleDelete('Esai', index)}
                    className="bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 transition"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardGuru;
