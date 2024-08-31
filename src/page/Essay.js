import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import stringSimilarity from 'string-similarity';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaHome, FaTimes } from 'react-icons/fa';

const Essay = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [essayId, setEssayId] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDisabledKey, setIsDisabledKey] = useState(false);
  

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEssayData = async () => {
      try {
        const essayResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/essay`);
        if (Array.isArray(essayResponse.data) && essayResponse.data.length > 0) {
          setQuestions(essayResponse.data.map(essay => essay.soal));
          setCorrectAnswers(essayResponse.data.map(essay => essay.kunci));
          setEssayId(essayResponse.data.map(essay => essay._id));
  
          if (id) {
            const studentResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/${id}`);
            if (studentResponse.data) {
              setStudentName(studentResponse.data.namaSiswa);
              const studentEssay = studentResponse.data.essay || [];
  
              const hasSubmittedAnswer = studentEssay.some(answer => answer.soal._id === essayId[currentQuestionIndex]);
              setShowForm(true);
              setIsDisabled(hasSubmittedAnswer);
              setIsDisabledKey(!hasSubmittedAnswer);
            }
          }
        } else {
          console.warn('No data found');
        }
      } catch (error) {
        console.error('Error fetching essay data:', error);
      }
    };
  
    const fetchAnswers = async () => {
      try {
        const allStudentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa`);
        const allStudents = allStudentsResponse.data;
  
        const filteredAnswers = allStudents
          .map(student => {
            const studentEssay = student.essay.find(essay => essay.soal === essayId[currentQuestionIndex]);
            if (studentEssay) {
              return {
                text: studentEssay.jawabanSiswa,
                similarity: studentEssay.skorEssay,
                idSoal: studentEssay.soal,
                namaSiswa: student.namaSiswa,
                studentId: student._id,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                position: getRandomPosition(),
              };
            }
            return null;
          })
          .filter(answer => answer !== null);
  
        setAnswers(filteredAnswers);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };
  
    fetchEssayData();
    fetchAnswers();
  
  }, [id, currentQuestionIndex, essayId[currentQuestionIndex]]); 
  
  


  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userAnswer.trim() === '') return;
  
    const currentEssayId = essayId[currentQuestionIndex];
    const hasSubmittedAnswer = answers.some(answer => answer.soal === currentEssayId && answer.namaSiswa === studentName);
    
    if (hasSubmittedAnswer) {
      console.warn('You have already submitted an answer for this question.');
      return;
    }
  
    const similarity = stringSimilarity.compareTwoStrings(userAnswer, correctAnswers[currentQuestionIndex]);
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const position = getRandomPosition();
  
    const newAnswer = { text: userAnswer, similarity, color, position, namaSiswa: studentName };
    setAnswers([...answers, newAnswer]);
    setUserAnswer('');
    setIsDisabled(true);
  
    try {
      // Ambil data siswa saat ini dari API
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/${id}`);
      const siswaData = response.data;
  
      // Tambahkan entri baru ke array essay jika soal berbeda
      const updatedEssayArray = siswaData.essay.filter(item => item.soal.toString() !== currentEssayId).concat([{
        jawabanSiswa: userAnswer,
        skorEssay: similarity,
        soal: currentEssayId,
      }]);
  
      // Kirim permintaan untuk memperbarui field essay dengan array yang telah diperbarui
      await axios.put(`${process.env.REACT_APP_API_URL}api/siswa/${id}`, {
        essay: updatedEssayArray
      });
  
      setShowForm(true);
      window.location.reload();
    } catch (error) {
      console.error('Error posting user answer:', error);
    }
  };
  

  const handleShowAnswerKey = async () => {
    setShowAnswerKey(true);
    setShowForm(false);
    setSortedAnswers(
      answers.sort((a, b) => b.similarity - a.similarity)
    );
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowForm(true);
      setShowAnswerKey(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowForm(true);
      setShowAnswerKey(false);
    }
  };
  const handleDelete = async (studentId, essayID) => {
    // Konfirmasi penghapusan
    if (window.confirm(`Anda yakin ingin menghapus jawaban dengan EssayID: ${essayID} untuk studentId: ${studentId}?`)) {
      try {
        // Ambil data siswa saat ini
        const { data: student } = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/${studentId}`);
        console.log('Data siswa:', student);
  
        // Filter berdasarkan _id dari essay
        const updatedEssay = student.essay.filter(essay => essay.soal._id !== essayID);
  
        // Kirim permintaan untuk memperbarui field essay
        await axios.put(`${process.env.REACT_APP_API_URL}api/siswa/${studentId}`, {
          essay: updatedEssay
        });
        
        // Hapus jawaban dari state lokal setelah penghapusan berhasil
        setAnswers(prevAnswers =>
          prevAnswers.filter(answer => answer.essayId !== essayID)
        );
        setIsDisabled(false);
        console.log('Jawaban berhasil dihapus');
      } catch (error) {
        console.error('Error menghapus jawaban:', error);
      }
    }
  };
  
  
  


  const getRandomPosition = () => {
    const padding = 20;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const availableWidth = viewportWidth - 2 * padding;
    const availableHeight = viewportHeight - 2 * padding;
    const left = Math.random() * availableWidth + padding;
    const top = Math.random() * availableHeight + padding;

    return { top: `${top}px`, left: `${left}px` };
  };



  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100"
      style={{
        backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/Motivational%20Desktop%20Wallpaper.png?alt=media&token=311be7e7-ebac-4bc9-94b3-6cd2d5edc559')",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
      {/* Header Section */}
      <header className="bg-teal-600 text-white w-full py-4 px-6 shadow-md">
        <h1 className="text-3xl font-bold">Esai</h1>
      </header>
      <div className="relative flex flex-col items-center w-full max-w-4xl mt-10">
        <h1 className="text-3xl font-bold ">Halo {studentName}, silahkan menjawab soal </h1>
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {currentQuestionIndex + 1}. {questions[currentQuestionIndex] || 'Loading...'}
        </h1>
        {!showAnswerKey && showForm && (
          <form onSubmit={handleSubmit} className="relative flex flex-col items-center w-full max-w-lg z-10">
            <input
              type="text"
              value={userAnswer}
              onChange={handleChange}
              disabled={isDisabled} // Disable input if isDisabled is true
              className="border border-gray-300 p-2 w-full mb-4 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder={isDisabled ? "Kamu sudah menjawab soal ini" : "Ketik jawaban Anda di sini"}
            />
            <button
              type="submit"
              disabled={isDisabled} // Disable button if isDisabled is true
              className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
              disabled={isDisabledKey}
              onClick={handleShowAnswerKey}
              className="mt-4 bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600 transition"
            >
              Show Answer Key
            </button>
          </form>

        )}
        {showAnswerKey && (
          <div
            className="p-4 rounded-md bg-yellow-100 shadow-lg text-center mt-8"
            style={{ width: '80%' }}
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Kunci Jawaban</h2>
            <p>{correctAnswers[currentQuestionIndex]}</p>
          </div>
        )}
        {showAnswerKey && sortedAnswers.map((answer, index) => (
          <div
            key={index}
            className="p-2 rounded-md bg-white shadow-lg text-center mb-4"
            style={{ color: answer.color }}
          >
            <span className="font-semibold text-lg">{answer.text}</span>
            <div className="text-sm text-gray-600 mt-1">
              ({answer.namaSiswa})
              ({answer.similarity !== undefined ? answer.similarity.toFixed(2) : 'N/A'})
            </div>
          </div>
        ))}
        {showAnswerKey && (
          <>
            <div className="mt-6 flex space-x-4 justify-center">
              {currentQuestionIndex === 0 && (
                <button
                  onClick={handleNextQuestion}
                  disabled={currentQuestionIndex === questions.length - 1}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 transition"
                >
                  <FaChevronRight />
                  <span>Soal Berikutnya</span>
                </button>
              )}

              {currentQuestionIndex > 0 && currentQuestionIndex < questions.length - 1 && (
                <>
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 transition"
                  >
                    <FaChevronLeft />
                    <span>Soal Sebelumnya</span>
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 transition"
                  >
                    <FaChevronRight />
                    <span>Soal Berikutnya</span>
                  </button>
                </>
              )}

              {currentQuestionIndex === questions.length - 1 && (
                <>
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="bg-gray-500 text-white px-6 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-8 transition"

                  >
                    <FaChevronLeft />
                    <span>Soal Sebelumnya</span>
                  </button>
                  <button
                    onClick={() => navigate(`/tipe-soal/${id}`)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md flex items-center space-x-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-8 transition"
                  >
                    <FaHome/>
                    <span>Kembali ke Halaman Menu</span>
                  </button>
                </>
              )}
            </div>
          </>
        )}

      </div>

      {/* Area untuk jawaban acak di luar form dan pertanyaan */}
      {!showAnswerKey && (
        <div className="absolute inset-0 flex flex-col">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="relative p-4 rounded-lg shadow-lg text-center mb-4 transform transition-transform hover:scale-105 group"
              style={{
                backgroundColor: answer.color,
                color: '#fff',
                position: 'absolute',
                ...answer.position,
                border: '2px solid #fff',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                zIndex: 10, // Ensure the answer is above other elements
              }}
            >
              <span className="font-bold text-xl">{answer.text}</span>
              <div className="text-sm text-gray-200 mt-2">
                <i>{answer.namaSiswa}</i>
              </div>
              {answer.studentId === id && (
                <button
                  onClick={() => handleDelete(id,essayId[currentQuestionIndex])}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20" // Ensure the button is above other elements
                  style={{ border: '2px solid red', pointerEvents: 'auto' }} // Debug border and pointer events
                >
                  <FaTimes />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Essay;
