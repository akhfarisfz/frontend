import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaEdit, FaVideo, FaBook, FaSignOutAlt } from 'react-icons/fa';

const PilihTipeSoal = () => {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigate('/'); // Redirect to login or another page
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">MENU EXPERIENTAL LEARNING</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white flex items-center py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </header>
      
      <main className="flex flex-col items-center justify-center flex-1 p-6">
        <div className="flex flex-col space-y-8 w-full max-w-4xl">
          <div className="flex flex-col space-y-6">
            <button
              onClick={() => navigate(`/pilihan-ganda/${id}`)}
              className="flex flex-col items-center justify-center bg-blue-600 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 border-2 border-blue-800"
            >
              <FaCheckCircle className="text-4xl mb-4" />
              <div className="text-center">
                <h2 className="text-xl font-bold">PILIHAN GANDA</h2>
                <p className="text-sm text-gray-200">Pilih jawaban yang tepat</p>
              </div>
            </button>
            <button
              onClick={() => navigate(`/tanya-jawab-essay/${id}`)}
              className="flex flex-col items-center justify-center bg-green-600 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 border-2 border-green-800"
            >
              <FaEdit className="text-4xl mb-4" />
              <div className="text-center">
                <h2 className="text-xl font-bold">ESSAY</h2>
                <p className="text-sm text-gray-200">Jawab dengan kalimat yang lengkap</p>
              </div>
            </button>
          </div>

          <div className="flex flex-col space-y-6">
            <button
              onClick={() => navigate(`/video-pembelajaran`)}
              className="flex flex-col items-center justify-center bg-yellow-500 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-yellow-600 transition-transform transform hover:scale-105 border-2 border-yellow-700"
            >
              <FaVideo className="text-4xl mb-4" />
              <div className="text-center">
                <h2 className="text-xl font-bold">VIDEO PEMBELAJARAN</h2>
              </div>
            </button>
            <button
              onClick={() => navigate(`/petunjuk`)}
              className="flex flex-col items-center justify-center bg-gray-600 text-white py-6 px-8 rounded-lg shadow-lg hover:bg-gray-700 transition-transform transform hover:scale-105 border-2 border-gray-800"
            >
              <FaBook className="text-4xl mb-4" />
              <div className="text-center">
                <h2 className="text-xl font-bold">PEDOMAN</h2>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PilihTipeSoal;
