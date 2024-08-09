import React from 'react';
import { useNavigate } from 'react-router-dom';

const PilihanPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Pilih Peran Anda</h1>
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
    </div>
  );
};

export default PilihanPage;
