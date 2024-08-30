import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaEdit, FaBook, FaSignOutAlt, FaHome } from 'react-icons/fa';
import axios from 'axios';

const PilihTipeSoal = () => {
  const { id } = useParams(); // Mengambil 'id' dari URL
  const navigate = useNavigate();
  const [role, setRole] = useState('siswa'); // Default value for role

  useEffect(() => {
    // Function to fetch siswa data and check the ID
    const fetchSiswaData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa`);
        const siswaData = response.data;

        // Find the student with the specific ID
        const foundStudent = siswaData.find(student => student.namaSiswa === 'uslifatuljannah14');
        
        if (foundStudent) {
          // Check if the URL ID matches and update role
          if (id === foundStudent._id) {
            setRole('guru');
          }
        }
      } catch (error) {
        console.error('Error fetching siswa data:', error);
      }
    };

    fetchSiswaData();
  }, [id]);

  const handleClick = () => {
    // Conditional navigation based on role and ID
    if (role === 'guru' ) {
      navigate(`/tipe-soal/${id}`);
    } else {
      navigate(`/pilihan-ganda/${id}`);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    navigate('/'); // Redirect to login or another page
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-teal-600 text-white shadow-md p-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">Menu</h1>
        <h1 className="text-2xl font-extrabold">MAGNETIK</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white flex items-center py-2 px-4 rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </header>

      <main
        className="flex flex-col items-center justify-center flex-1 p-6"
        style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/3838986.jpg?alt=media&token=845c9b69-9052-40b1-b605-eb185a40f1b0')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col space-y-8 w-full max-w-4xl">


          {/* First Row */}
          {role === 'guru' ? (
            <div className="flex flex-col space-y-8 w-full max-w-4xl">
              <div className="flex justify-between">
                <button
                  onClick={() => navigate(`/dashboard`)}
                  className="flex items-center bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-6 px-8 rounded-full shadow-lg hover:from-yellow-600 hover:to-yellow-800 transition-transform transform hover:scale-105 border-2 border-yellow-800 w-full sm:w-[98%] mx-auto sm:mx-0"
                >
                  <div className="flex items-center flex-grow">
                    <FaHome className="text-4xl mr-4" />
                    <div className="text-left">
                      <h2 className="text-xl font-bold">Dashboard</h2>
                      <p className="text-sm text-gray-200">Hanya Guru yang bisa mengakses ini</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <h1 className="text-4xl font-extrabold shadow-xl transform transition-transform hover:scale-105 text-center font-serif">
              Jelajahi Dunia Magnet dan Temukan Keajaibannya!
            </h1>

          )}
          {/* {Second Row} */}
          <div className="flex flex-col space-y-8 w-full max-w-4xl">
            <div className="flex justify-between">
              <button
                onClick={handleClick}
                className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white py-6 px-8 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105 border-2 border-blue-800 w-full sm:w-[48%] mx-auto sm:mx-0"
              >
                <div className="flex items-center flex-grow">
                  <FaCheckCircle className="text-4xl mr-4" />
                  <div className="text-left">
                    <h2 className="text-xl font-bold">PILIHAN GANDA</h2>
                    <p className="text-sm text-gray-200">Jawab Soal dengan pilihan jawaban</p>
                  </div>

                </div>
              </button>

              <button
                onClick={() => navigate(`/tanya-jawab-essay/${id}`)}
                className="flex items-center bg-gradient-to-r from-green-500 to-green-700 text-white py-6 px-8 rounded-full shadow-lg hover:from-green-600 hover:to-green-800 transition-transform transform hover:scale-105 border-2 border-green-800 w-full sm:w-[48%] mx-auto sm:mx-0"
              >
                <div className="flex items-center flex-grow">
                  <FaEdit className="text-4xl mr-4" />
                  <div className="text-left">
                    <h2 className="text-xl font-bold">ESSAY</h2>
                    <p className="text-sm text-gray-200">Jawab dengan temanmu secara langsung</p>
                  </div>
                </div>
              </button>
            </div>
          </div>


          {/* Third Row */}
          <div className="flex flex-col space-y-8 w-full max-w-4xl">
            <div className="flex justify-between">

              <button
                onClick={() => navigate(`/materi-ajar/${id}`)}
                className="flex items-center bg-gradient-to-r bg-orange-600 to-yellow-800 text-white py-6 px-8 rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-700 transition-transform transform hover:scale-105 border-2 border-yellow-800 w-full sm:w-[48%] mx-auto sm:mx-0"
              >
                <div className="flex items-center flex-grow">
                  <FaBook className="text-4xl mr-4" />
                  <div className="text-left">
                    <h2 className="text-xl font-bold">MATERI AJAR</h2>
                    <p className="text-sm text-gray-200">Berisi presentasi dan Video pembelajaran Magnetik</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate(`/petunjuk/${id}`)}
                className="flex items-center bg-gradient-to-r from-gray-500 to-gray-700 text-white py-6 px-8 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 transition-transform transform hover:scale-105 border-2 border-gray-900 w-full sm:w-[48%] mx-auto sm:mx-0"
              >
                <div className="flex items-center flex-grow">
                  <FaBook className="text-4xl mr-4" />
                  <div className="text-left">
                    <h2 className="text-lg font-bold">PEDOMAN</h2>
                    <p className="text-sm text-gray-200">Kegiatan Magnetik</p>

                  </div>
                </div>
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default PilihTipeSoal;
