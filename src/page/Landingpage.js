import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function LandingPage() {
  const [username, setUsername] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/siswa', { namaSiswa: username });
      const { message, siswa } = response.data; // Ambil 'siswa' dari respons

      if (message === 'Siswa sudah terdaftar') {
        console.log('User already registered');
      } else {
        console.log('User registered successfully');
      }

      const id = siswa?._id; // Ambil ID dari objek siswa
      console.log(id)

      // Navigasi berdasarkan peran dan sertakan ID dalam URL
      if (username === 'uslifatuljannah14') {
        navigate('/dashboard', { state: { username: username, role: 'guru' } });
      } else {
        if (id) {
          navigate(`/tipe-soal/${id}`); // Menambahkan ID ke URL params
        } else {
          console.error('ID tidak ditemukan dalam respons');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleStart = () => {
    setShowHero(false);
    setShowLogin(true);
  };

  return (
    <div className="relative h-screen bg-gradient-to-r from-pink-400 via-yellow-300 to-blue-400">
      {/* Hero Section */}
      {showHero && (
        <div className="flex items-center justify-center h-full bg-white bg-opacity-60">
          <div className="text-center p-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">Selamat Datang di Web Pembelajaran</h1>
            <p className="text-lg md:text-2xl text-gray-700 mb-8">Dengan Experiential Learning, Temukan Cara Baru dalam Mengajar dan Belajar.</p>
            <button
              onClick={handleStart}
              className="bg-teal-500 text-white py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
            >
              Mulai Sekarang
            </button>
          </div>
        </div>
      )}

      {/* Login Section */}
      {showLogin && (
        <div className="flex items-center justify-center min-h-screen bg-yellow-50">
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Masukkan Nama Kamu</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Nama
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
