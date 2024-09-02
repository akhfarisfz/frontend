import React, { useState, useEffect, useCallback } from 'react';
import './ManualImageSlider.css'; // Import custom CSS for animations
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';

const MateriAjar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [transition, setTransition] = useState('fade-in'); // State for transition class
  const [preloadedImages, setPreloadedImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();


  const imageUrls = [
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F1.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F2.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F3.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F4.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F5.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F6.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F7.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F8.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F9.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F10.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F11.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F12.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F13.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F14.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F15.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F16.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F17.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F18.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F19.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F20.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F21.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F22.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F23.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
   'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%201%2F24.png?alt=media&token=55811e84-8705-448f-8f28-c4a5439fc454',
  ];

  const imageUrls2=[
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F1.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F2.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F3.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F4.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F5.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F6.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F7.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F8.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/PPT%202%2F9.png?alt=media&token=a4a2d187-2515-48d8-b874-cad505f3d9cd',
  ];

  useEffect(() => {
    // Preload images
    const images = imageUrls.map(url => {
      const img = new Image();
      img.src = url;
      return img;
    });
    setPreloadedImages(images);
    const images2 = imageUrls2.map(url => {
      const img = new Image();
      img.src = url;
      return img;
    });
    setPreloadedImages(images);

    setPreloadedImages(images2);
  }, [imageUrls,imageUrls2]);

  const handlePrev = useCallback(() => {
    setTransition('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
      setTransition('fade-in');
    }, 300); // Match the duration of the fade-out transition
  }, [imageUrls.length]);

  const handleNext = useCallback(() => {
    setTransition('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
      setTransition('fade-in');
    }, 300); // Match the duration of the fade-out transition
  }, [imageUrls.length]);
  const handlePrev2 = useCallback(() => {
    setTransition('fade-out');
    setTimeout(() => {
      setCurrentIndex2((prevIndex) => (prevIndex === 0 ? imageUrls2.length - 1 : prevIndex - 1));
      setTransition('fade-in');
    }, 300); // Match the duration of the fade-out transition
  }, [imageUrls2.length]);

  const handleNext2 = useCallback(() => {
    setTransition('fade-out');
    setTimeout(() => {
      setCurrentIndex2((prevIndex) => (prevIndex === imageUrls2.length - 1 ? 0 : prevIndex + 1));
      setTransition('fade-in');
    }, 300); // Match the duration of the fade-out transition
  }, [imageUrls2.length]);

  return (
    <div className="relative min-h-screen pt-16"style={{
      backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Science%20Laboratory%20Rules%20Educational%20Presentation%20in%20Blue%20and%20White%20Hand%20Drawn%20Style.png?alt=media&token=108417a0-6e78-434a-9731-33979bb93ee3')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-teal-600 text-white py-4 px-6 shadow-md z-10">
        <h1 className="text-3xl font-bold text-center">Materi Ajar</h1>
      </header>
      {/* {PPT} */}
      <div className="mx-auto bg-white rounded-lg shadow-md mt-10 max-w-[70%] relative overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-center">Materi Ajar Magnet</h2>

        <div className="relative">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <img
              src={imageUrls[currentIndex]}
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${transition === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
              alt={`Slide ${currentIndex + 1}`}
              loading="lazy"
            />
          </div>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 px-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 px-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="mx-auto bg-white rounded-lg shadow-md mt-10 max-w-[70%] relative overflow-hidden">
        <h2 className="text-2xl font-bold mb-4 text-center">Sifat Medan Magnet</h2>

        <div className="relative">
          <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
            <img
              src={imageUrls2[currentIndex2]}
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${transition === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
              alt={`Slide ${currentIndex + 1}`}
              loading="lazy"
            />
          </div>

          {/* Prev Button */}
          <button
            onClick={handlePrev2}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 px-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80"
            aria-label="Previous"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext2}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 px-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80"
            aria-label="Next"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      {/* {Video Pembelajaran} */}
      <div className="my-14 flex flex-col max-w-[70%] mx-auto items-center bg-white rounded-lg">
        <h2 className="text-2xl font-semibold mb-2 text-center ">Video Pembelajaran</h2>
        <p className="text-center mb-4 text-gray-700">Belajar tentang magnet dengan video tutorial ini. Pelajari cara kerja magnet, jenis-jenis magnet, dan aplikasi praktisnya dalam kehidupan sehari-hari.</p>
        <div className="relative aspect-w-16 aspect-h-9  ">
          <iframe
            width="853"
            height="480"
            src="https://www.youtube.com/embed/yXCeuSiTOug"
            title="Magnetism | The Dr. Binocs Show | Educational Videos For Kids"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>
          </iframe>
        </div>
      </div>
      <div>
        <button
          onClick={() => navigate(`/tipe-soal/${id}`)}
          className="bg-yellow-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition flex items-center justify-center w-full"
        >
          <MdArrowBack className="text-2xl mr-2" />
          <span className="text-lg">Kembali ke Menu</span>
        </button>
      </div>
    </div>
  );
};

export default MateriAjar;
