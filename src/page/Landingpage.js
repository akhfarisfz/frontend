import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LandingPage() {
  const [username, setUsername] = useState('');
  const [showHero, setShowHero] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading animation
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show spinner when form is submitted

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
      setLoading(false); // Hide spinner when login process is complete
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
        <div className="relative flex items-center justify-center min-h-screen bg-yellow-50">
          <div className="w-full max-w-md bg-white bg-opacity-90 p-8 rounded-lg shadow-lg border border-gray-300">
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
