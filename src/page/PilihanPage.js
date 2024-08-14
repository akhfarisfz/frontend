import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PilihanPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil state dari location
  const state = location.state || {};
  const nama = state.username;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">


      {/* Tampilkan role jika ada */}
      {nama &&
       <div>
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Selamat Datang {nama} di Web Jawaban Konsep!</h1>
        <p className="text-lg text-gray-600 mb-12">Pilih peran Anda untuk memulai</p>
       </div>
        
      }

<div className="flex space-x-4">
  <button
    onClick={() => navigate('/kelompok-siswa')}
    className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition"
  >
    Kelompok Siswa
  </button>
  <button
    onClick={() => alert('Fitur Guru sedang dalam pengembangan')}
    className="bg-green-500 text-white p-4 rounded-md shadow hover:bg-green-600 transition"
  >
    Guru
  </button>
</div>
    </div >
  );
};

export default PilihanPage;
