import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaArrowDown } from 'react-icons/fa';

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
    <div>
      {/* Navbar Section */}
      <div className="flex items-center justify-between bg-sky-100 p-4 shadow-lg">
        <div className="flex items-center">
          <img src="/experiential-learning.png" alt="Logo" className="w-12 h-12 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Experiental Learning</h1>
        </div>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            onClick={handleStart}
          >Mulai pengalamanmu</button>
        </div>
      </div>




      <div className="min-h-screen flex flex-col-reverse items-center justify-between bg-sky-100 p-5 lg:flex-row xl:p-20 ">
        <div className="lg:hidden flex justify-center">
          <FaArrowDown className="text-gray-900 text-4xl animate-bounce" />
        </div>
        <div className="lg:max-w-xl">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Pembelajaran Magnet</h1>
          <p className="text-lg text-gray-700 mb-6">Mulai pengalamanmu dengan aplikasi kami dan pelajari semua tentang magnet dengan cara yang menyenangkan!</p>
        </div>

        <div>
          <img src="/3616399-removebg-preview.png" alt="Hand holding phone" className="w-full max-w-lg" />
        </div>

      </div>

      {/* Features Section */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-white shadow-lg">
        <h2 className="text-5xl font-bold mb-8 text-center font-serif">Apa yang akan kamu pelajari?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full max-w-6xl my-20">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <img src="/4905784.jpg" alt="Video Pembelajaran" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-bold mb-2">Video Pembelajaran</h3>
            <p className="text-md text-gray-700 mb-4">
              Ayo tonton video pembelajaran yang penuh warna dan menarik tentang magnet.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <img src="/2438387.jpg" alt="Materi Menarik" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-bold mb-2">Eksperimen yang Asyik</h3>
            <p className="text-lg text-gray-700 mb-4">
              Kamu akan belajar tentang magnet dengan pengalaman yang baru!.
            </p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <img src="/5308579.jpg" alt="Tanya Jawab Interaktif" className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-2xl font-bold mb-2">Tanya Jawab Interaktif</h3>
            <p className="text-lg text-gray-700 mb-4">
              Kamu juga akan berlatih pemahamanmu dengan kelompok lain tentang magnet.
            </p>
          </div>
        </div>
      </div>



      {/* Call to Action Section */}
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100"style={{
      backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Science%20Laboratory%20Rules%20Educational%20Presentation%20in%20Blue%20and%20White%20Hand%20Drawn%20Style.png?alt=media&token=108417a0-6e78-434a-9731-33979bb93ee3')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>

        {/* Gambar besar di tengah */}
        <div className="mb-8">
          <img
            src="/studying-woman-with-eyeglasses-isolated.png"
            alt="Ilustrasi Belajar"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg object-cover rounded-lg"
          />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-white text-center">Tunggu apa lagi? Ayo mulai belajar sekarang!</h2>

  
        {/* Tombol Daftar Sekarang */}
        <button
          className="bg-teal-500 text-white py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105 mb-4"
          onClick={handleStart}
        >
          Mulai Belajar
        </button>
      </div>


      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>&copy; 2024 Ibu Uslifatul Cantik.</p>
      </footer>

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
            <form className="space-y-6">
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
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-md shadow-lg"
                onClick={handleLogin}
              >
                Log in
              </button>
            </form>

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
