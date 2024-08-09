import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const KelompokSiswaPage = () => {
  const [groupName, setGroupName] = useState('');
  const navigate = useNavigate();

  const handleGroupNameChange = (e) => {
    setGroupName(e.target.value);
  };

  const handleProceed = () => {
    if (groupName.trim() === '') {
      alert('Nama kelompok harus diisi!');
      return;
    }

    // Arahkan ke halaman pilihan soal setelah mengisi nama kelompok
    navigate('/tipe-soal');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Masukkan Nama Kelompok</h1>
      <input
        type="text"
        value={groupName}
        onChange={handleGroupNameChange}
        className="border border-gray-300 p-2 w-3/5 mb-4 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Nama Kelompok"
      />
      <button
        onClick={handleProceed}
        className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition"
      >
        Lanjutkan
      </button>
    </div>
  );
};

export default KelompokSiswaPage;
