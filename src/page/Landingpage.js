import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

function LandingPage() {
  const [username, setUsername] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/siswa`, { namaSiswa: username });
      const { message, siswa } = response.data;

      if (message === 'Siswa sudah terdaftar') {
        console.log('User already registered');
      } else {
        console.log('User registered successfully');
      }

      const id = siswa?._id;
      console.log(id);

      if (username === 'uslifatuljannah14') {
        navigate('/dashboard', { state: { username: username, role: 'guru' } });
      } else {
        if (id) {
          navigate(`/tipe-soal/${id}`);
        } else {
          console.error('ID tidak ditemukan dalam respons');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setLoading(false);
      setShowLogin(false); // Close modal on successful login
    }
  };

  const handleStart = () => {
    setShowLogin(true);
  };

  return (
    <div className="relative h-auto bg-gradient-to-r from-blue-300 via-green-300 to-yellow-300">
      {/* Transparent Navbar */}
      {/* <nav className="relative top-0 left-0 w-full bg-transparent text-white py-4 px-6 shadow-md z-20 flex justify-between items-center">
        <div>
          <a href="#section1" className="mr-4 hover:underline">Apa Itu Magnet?</a>
          <a href="#section2" className="mr-4 hover:underline">Bagaimana Cara Kerja Magnet?</a>
          <a href="#section3" className="hover:underline">Eksperimen Seru</a>
        </div>
        <div>
          <button
            onClick={handleStart}
            className="bg-teal-500 text-white py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Mulai Belajar
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="flex items-center justify-center h-screen bg-white bg-opacity-60">
        <div className="text-center p-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4">Selamat Datang di Pembelajaran Magnet!</h1>
          <p className="text-lg md:text-2xl text-gray-700 mb-8">Dengan Experiential Learning, Temukan Keajaiban Magnet di Sekitar Kita.</p>
          <button
            onClick={handleStart}
            className="bg-teal-500 text-white py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
          >
            Mulai Belajar
          </button>
        </div>
      </div>
      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-2xl" />
            </button>
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
                  placeholder="Masukkan nama lengkap"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-500 sm:text-sm transition-transform transform hover:scale-105"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-gradient-to-r hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-transform transform hover:scale-105"
              >
                Log in
              </button>
            </form>

            {/* Show spinner during loading */}
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                <div className="w-16 h-16 border-4 border-t-4 border-teal-500 border-solid rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
