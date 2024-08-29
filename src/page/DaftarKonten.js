import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DaftarKonten() {
  const navigate = useNavigate();
  const [konten, setKonten] = useState([
    { id: 1, judul: 'Video Pembelajaran', url: 'https://www.canva.com/design/DAGPItwUUpw/AYalLOgiedXmlXez55s1Lg/edit?utm_content=DAGPItwUUpw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' },
    { id: 2, judul: 'Pedoman Petunjuk', url: 'https://www.canva.com/design/DAGPJykvFio/uojydifVZQh5Z32x0gdQdw/edit?utm_content=DAGPJykvFio&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton' }
  ]);
  const [judul, setJudul] = useState('');
  const [url, setUrl] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAdd = () => {
    if (!judul || !url) {
      alert('Judul dan URL harus diisi');
      return;
    }
    if (editIndex !== null) {
      // Update existing content
      const updatedKonten = [...konten];
      updatedKonten[editIndex] = { id: konten[editIndex].id, judul, url };
      setKonten(updatedKonten);
      setEditIndex(null);
    } else {
      // Add new content
      setKonten([...konten, { id: konten.length + 1, judul, url }]);
    }
    setJudul('');
    setUrl('');
  };

  const handleEdit = (index) => {
    setJudul(konten[index].judul);
    setUrl(konten[index].url);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setKonten(konten.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <header className="bg-white shadow-md p-4 mb-6 rounded-md w-full max-w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Konten</h1>
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white p-2 rounded-md"
        >
          Kembali
        </button>
      </header>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">{editIndex !== null ? 'Edit Konten' : 'Tambah Konten'}</h2>
        <input
          type="text"
          placeholder="Judul"
          value={judul}
          onChange={(e) => setJudul(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <input
          type="url"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          {editIndex !== null ? 'Update' : 'Tambah'}
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl font-bold mb-4">Daftar Konten</h2>
        <ul>
          {konten.map((item, index) => (
            <li key={item.id} className="mb-4 flex justify-between items-center">
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {item.judul}
              </a>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white p-2 rounded-md mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white p-2 rounded-md"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DaftarKonten;
