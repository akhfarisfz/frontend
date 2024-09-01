import React, { useState, useEffect, useCallback } from 'react';
import './ManualImageSlider.css'; // Import custom CSS for animations
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowRight } from 'react-icons/md';

const Pedoman = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState('fade-in'); // State for transition class
  const [preloadedImages, setPreloadedImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const imageUrls = [
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Pedoman%20Pembelajaran%2F1.png?alt=media&token=b7ef9649-7a6a-406b-8d8b-02fdb50567d7',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Pedoman%20Pembelajaran%2F2.png?alt=media&token=b7ef9649-7a6a-406b-8d8b-02fdb50567d7',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Pedoman%20Pembelajaran%2F3.png?alt=media&token=b7ef9649-7a6a-406b-8d8b-02fdb50567d7',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Pedoman%20Pembelajaran%2F4.png?alt=media&token=b7ef9649-7a6a-406b-8d8b-02fdb50567d7',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Pedoman%20Pembelajaran%2F5.png?alt=media&token=b7ef9649-7a6a-406b-8d8b-02fdb50567d7',
    'https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Pedoman%20Pembelajaran%2F6.png?alt=media&token=b7ef9649-7a6a-406b-8d8b-02fdb50567d7',
  ];

  useEffect(() => {
    // Preload images
    const images = imageUrls.map(url => {
      const img = new Image();
      img.src = url;
      return img;
    });
    setPreloadedImages(images);
  }, [imageUrls]);

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

  return (
    <div className="relative min-h-screen pt-16"
      style={{
        backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Science%20Laboratory%20Rules%20Educational%20Presentation%20in%20Blue%20and%20White%20Hand%20Drawn%20Style.png?alt=media&token=108417a0-6e78-434a-9731-33979bb93ee3')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-teal-600 text-white py-4 px-6 shadow-md z-10">
        <h1 className="text-xl md:text-3xl font-bold text-center">Pedoman Praktikum</h1>
      </header>

      {/* Image Slider */}
      <div className="mx-auto bg-white rounded-lg shadow-xl mt-16 max-w-full relative overflow-hidden h-[80vh] md:h-[90vh]">
        <div className="relative h-full w-full">
          <img
            src={imageUrls[currentIndex]}
            className={`absolute top-0 left-0 w-full h-full object-cover rounded-lg transition-opacity duration-300 ${transition === 'fade-in' ? 'opacity-100' : 'opacity-0'}`}
            alt={`Slide ${currentIndex + 1}`}
            loading="lazy"
          />
          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-12 px-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80"
            aria-label="Previous"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 z-30 flex items-center justify-center h-12 px-4 bg-black bg-opacity-50 text-white hover:bg-opacity-80"
            aria-label="Next"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigate Button */}
      <div className="mt-12 px-4">
        <button
          onClick={() => navigate(`/tipe-soal/${id}`)}
          className="bg-yellow-500 text-white p-4 rounded-md shadow hover:bg-yellow-600 transition flex items-center justify-center w-full md:w-auto"
        >
          <MdArrowRight className="text-xl md:text-2xl mr-2" />
          <span className="text-base md:text-lg">Kembali ke Menu</span>
        </button>
      </div>
    </div>
  );
};

export default Pedoman;
