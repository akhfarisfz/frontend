import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSoal = () => {
  const { idsoal } = useParams();
  const navigate = useNavigate();
  
  const [type, setType] = useState('');
  const [soal, setSoal] = useState('');
  const [opsi, setOpsi] = useState(['']); // Options for 'pilihan-ganda' questions
  const [checkedOptions, setCheckedOptions] = useState([]); // To track selected options
  const [kunci, setKunci] = useState(''); // Key for essay questions
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        let response;
        if (window.location.pathname.includes('pilihan-ganda')) {
          setType('pilihan-ganda');
          response = await axios.get(`${process.env.REACT_APP_API_URL}api/pilihanGanda/${idsoal}`);
          setSoal(response.data.soal);
          setOpsi(response.data.pilihan);
          setCheckedOptions([response.data.kunci]);
        } else if (window.location.pathname.includes('essay')) {
          setType('essay');
          response = await axios.get(`${process.env.REACT_APP_API_URL}api/essay/${idsoal}`);
          setSoal(response.data.soal);
          setKunci(response.data.kunci);
        }
      } catch (error) {
        console.error('Error fetching question:', error.response || error.message || error);
        setError('Terjadi kesalahan saat memuat data soal. Silakan coba lagi.');
      }
    };

    fetchQuestion();
  }, [idsoal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (type === 'pilihan-ganda') {
        response = await axios.put(`${process.env.REACT_APP_API_URL}api/pilihanGanda/${idsoal}`, {
          soal,
          kunci: checkedOptions[0], // Assuming only one correct answer for simplicity
          pilihan: opsi,
        });
        alert('Soal Pilihan Ganda berhasil diperbarui');
      } else if (type === 'essay') {
        response = await axios.put(`${process.env.REACT_APP_API_URL}api/essay/${idsoal}`, {
          soal,
          kunci, // Include the key for essay questions
        });
        alert('Soal Esai berhasil diperbarui');
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating question:', error.response || error.message || error);
      setError('Terjadi kesalahan saat memperbarui soal. Silakan coba lagi.');
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...opsi];
    newOptions[index] = value;
    setOpsi(newOptions);
  };

  const handleCheckboxChange = (index) => {
    if (checkedOptions.includes(opsi[index])) {
      setCheckedOptions(checkedOptions.filter(opt => opt !== opsi[index]));
    } else {
      setCheckedOptions([opsi[index]]);
    }
  };

  const handleAddOption = () => {
    setOpsi([...opsi, '']);
  };

  const handleRemoveOption = (index) => {
    setOpsi(opsi.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="bg-white shadow-md p-4 mb-6 rounded-md w-full max-w-full">
        <h1 className="text-3xl font-bold text-gray-800">Edit Soal</h1>
      </header>

      <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white shadow-md rounded-md p-6">
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

export default EditSoal;
