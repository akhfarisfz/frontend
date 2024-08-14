// src/page/guru/TambahMenu.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TambahMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="bg-white shadow-md p-4 mb-6 rounded-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Menu</h1>
      </header>
      
      <div className="w-full max-w-2xl">
        <table className="w-full bg-white shadow-md rounded-md border border-gray-200">
          <thead>
            <tr className="bg-gray-200 border-b border-gray-300">
              <th className="p-4 text-left text-gray-600">Jenis Soal</th>
              <th className="p-4 text-left text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300">
              <td className="p-4 text-gray-800">Soal Pilihan Ganda</td>
              <td className="p-4">
                <button
                  onClick={() => navigate('/pilihan-ganda')}
                  className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
                >
                  Lihat Daftar
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-4 text-gray-800">Soal Esai</td>
              <td className="p-4">
                <button
                  onClick={() => navigate('/tanya-jawab-essay')}
                  className="bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600 transition"
                >
                  Lihat Daftar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TambahMenu;
