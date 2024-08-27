import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const TambahSoal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get type from location state, default to 'pilihan-ganda'
  const initialType = location.state?.type || 'pilihan-ganda';
  
  const [type, setType] = useState(initialType);
  const [soal, setSoal] = useState('');
  const [opsi, setOpsi] = useState(['']); // Options for 'pilihan-ganda' questions
  const [checkedOptions, setCheckedOptions] = useState([]); // To track selected options
  const [kunci, setKunci] = useState(''); // Key for essay questions
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (type === 'pilihan-ganda') {
        response = await axios.post(`${process.env.REACT_APP_API_URL}api/pilihanGanda`, {
          soal,
          kunci: checkedOptions[0], // Assuming only one correct answer for simplicity
          pilihan: opsi,
        });
        alert('Soal Pilihan Ganda berhasil ditambahkan');
      } else if (type === 'essay') {
        response = await axios.post(`${process.env.REACT_APP_API_URL}api/essay`, {
          soal,
          kunci, // Include the key for essay questions
        });
        alert('Soal Esai berhasil ditambahkan');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding question:', error.response || error.message || error);
      setError('Terjadi kesalahan saat menambahkan soal. Silakan coba lagi.');
    }
  };
  

  // Handle option input changes
  const handleOptionChange = (index, value) => {
    const newOptions = [...opsi];
    newOptions[index] = value;
    setOpsi(newOptions);
  };

  // Handle checkbox change
  const handleCheckboxChange = (index) => {
    if (checkedOptions.includes(opsi[index])) {
      setCheckedOptions(checkedOptions.filter(opt => opt !== opsi[index]));
    } else {
      setCheckedOptions([opsi[index]]);
    }
  };

  // Add or remove option fields
  const handleAddOption = () => {
    setOpsi([...opsi, '']);
  };

  const handleRemoveOption = (index) => {
    setOpsi(opsi.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="bg-white shadow-md p-4 mb-6 rounded-md w-full max-w-full">
        <h1 className="text-3xl font-bold text-gray-800">Tambah Soal</h1>
      </header>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white shadow-md rounded-md p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type">
            Tipe Soal
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="pilihan-ganda">Pilihan Ganda</option>
            <option value="essay">Esai</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="soal">
            Soal
          </label>
          <textarea
            id="soal"
            value={soal}
            onChange={(e) => setSoal(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="4"
            required
          />
        </div>

        {type === 'pilihan-ganda' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="opsi">
                Opsi
              </label>
              {opsi.map((option, index) => (
                <div key={index} className="mb-2 flex items-center">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className="border border-gray-300 rounded-md p-2 w-4/5"
                    required
                  />
                  <input
                    type="checkbox"
                    checked={checkedOptions.includes(option)}
                    onChange={() => handleCheckboxChange(index)}
                    className="ml-2"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="bg-red-500 text-white p-2 rounded-md ml-2"
                  >
                    Hapus
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddOption}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Tambah Opsi
              </button>
            </div>
          </>
        )}

        {type === 'essay' && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="kunci">
              Kunci Jawaban
            </label>
            <input
              id="kunci"
              value={kunci}
              onChange={(e) => setKunci(e.target.value)}
              className="border border-gray-300 rounded-md p-2 w-full"
              type="text"
            />
          </div>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600 transition"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default TambahSoal;
