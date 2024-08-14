import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PilihTipeSoal = () => {
  const navigate = useNavigate();
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Pilih Peran Anda</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/pilihan-ganda')}
          className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition"
        >
          PILIHAN GANDA
        </button>
        <button
          onClick={() => navigate('/tanya-jawab-essay')}
          className="bg-green-500 text-white p-4 rounded-md shadow hover:bg-green-600 transition"
        >
          ESSAY
        </button>
      </div>
    </div>
  );
};

export default PilihTipeSoal;
