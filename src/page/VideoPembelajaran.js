import React, { useState } from 'react';

const VideoPembelajaran = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videos, setVideos] = useState([]);

  const getVideoIdFromUrl = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})|(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:embed\/|v\/|watch\?v=)?([a-zA-Z0-9_-]{11})/);
    return match ? match[1] || match[2] : '';
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setVideoUrl(url);
    setVideoId(getVideoIdFromUrl(url));
  };

  const handleAddVideo = () => {
    if (videoId && !videos.includes(videoId)) {
      setVideos([...videos, videoId]);
      setVideoUrl('');
      setVideoId('');
    }
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter(video => video !== id));
  };

  return (
    <div className="relative min-h-screen pt-16"> {/* Add padding-top for fixed header */}
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-teal-600 text-white py-4 px-6 shadow-md z-10">
        <h1 className="text-3xl font-bold text-center">Soal Pilihan Ganda</h1>
      </header>

      <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-4">
        <h2 className="text-2xl font-bold mb-4">Video Pembelajaran tentang CRUD</h2>
        <input
          type="text"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="Masukkan URL video YouTube"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddVideo}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Tambah Video
        </button>

        <div className="mt-6">
          {videos.length > 0 ? (
            videos.map((videoId) => (
              <div key={videoId} className="mb-4">
                <iframe
                  width="100%"
                  height="315"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="Video Pembelajaran"
                  frameBorder="0"
                  className="rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => handleDeleteVideo(videoId)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Hapus Video
                </button>
              </div>
            ))
          ) : (
            <p>Tidak ada video yang ditambahkan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPembelajaran;
