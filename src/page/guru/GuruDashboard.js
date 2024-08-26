import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineDeleteForever, MdEdit, MdLogout, MdScore, MdManageAccounts,MdOutlineNotes } from 'react-icons/md';
import axios from 'axios';

const DashboardGuru = () => {
  const [pilihanGanda, setPilihanGanda] = useState([]);
  const [essay, setEssay] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const username = state.username;

  useEffect(() => {
    // Fetch Pilihan Ganda data
    const fetchPilihanGanda = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/pilihanGanda');
        setPilihanGanda(response.data);
      } catch (error) {
        console.error('Error fetching Pilihan Ganda data:', error);
      }
    };

    // Fetch Essay data
    const fetchEssay = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/essay');
        setEssay(response.data);
      } catch (error) {
        console.error('Error fetching Essay data:', error);
      }
    };

    fetchPilihanGanda();
    fetchEssay();
  }, []);

  const handleEdit = (type, index) => {
    // Implementasi aksi edit
    alert(`Edit ${type} at index ${index}`);
  };

  const handleDelete = async (type, id) => {
    try {
      if (type === 'Pilihan Ganda') {
        await axios.delete(`http://localhost:4000/api/pilihanGanda/${id}`);
        setPilihanGanda(pilihanGanda.filter(item => item._id !== id));
      } else if (type === 'Esai') {
        await axios.delete(`http://localhost:4000/api/essay/${id}`);
        setEssay(essay.filter(item => item._id !== id));
      }
      alert(`${type} deleted successfully`);
    } catch (error) {
      console.error(`Error deleting ${type}:`, error);
    }
  };
  const handleLogout = () => {
    // Clear any authentication tokens or user data
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="bg-white shadow-md p-4 mb-6 rounded-md w-full max-w-full flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Guru</h1>
          {username && <p className="text-lg text-gray-600">Welcome, {username}!</p>}
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 transition"
        >
          <MdLogout className="inline-block mr-1" />
          Logout
        </button>
      </header>


      <div className="w-full mb-6 flex">
        <button
          onClick={() => navigate('/daftar-nilai')}

          className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition flex items-center justify-center w-1/2"
        >
          <MdScore className="text-2xl mr-2" />
          <span className="text-lg">Daftar Nilai Siswa</span>
        </button>

        <button
          onClick={() => navigate('/petunjuk')}
          className="bg-green-500 text-white p-4  rounded-md shadow hover:bg-green-600 transition flex items-center justify-center w-1/2"
        >
          <MdManageAccounts className="text-2xl mr-2" />
          <span className="text-lg">Kelola Konten</span>
        </button>
      </div>
      <div className="w-full mb-6 flex">
        <button
          onClick={() => navigate('/daftar-nilai')}
          className="bg-yellow-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition flex items-center justify-center w-full"
        >
          <MdOutlineNotes className="text-2xl mr-2" />
          <span className="text-lg">Sesi Soal</span>
        </button>
      </div>
      



      {/* Tabel Soal Pilihan Ganda */}
      <div className="w-full mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Soal Pilihan Ganda</h2>
          <button
             onClick={() => navigate('/tambah-soal', { state: { type: 'pilihan-ganda' } })}
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
            {pilihanGanda.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-300">
                <td className="p-4 text-gray-800">{item.soal}</td>
                <td className="p-4 text-gray-800">{item.kunci}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit('Pilihan Ganda', index)}
                    className="bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600 transition mr-2"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete('Pilihan Ganda', item._id)}
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
             onClick={() => navigate('/tambah-soal', { state: { type: 'essay' } })}
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
            {essay.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-300">
                <td className="p-4 text-gray-800">{item.soal}</td>
                <td className="p-4 text-gray-800">{item.kunci}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleEdit('Esai', index)}
                    className="bg-yellow-500 text-white p-2 rounded-md shadow hover:bg-yellow-600 transition mr-2"
                  >
                    Ubah
                  </button>
                  <button
                    onClick={() => handleDelete('Esai', item._id)}
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
