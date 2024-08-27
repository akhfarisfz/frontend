import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import stringSimilarity from 'string-similarity';
import axios from 'axios';
// import io from 'socket.io-client';

// const socket = io(`${process.env.REACT_APP_API_URL}`); // Connect to the server
// // const socket = io('localhost'); // Connect to the server

const Essay = () => {
  const [question, setQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [studentName, setStudentName] = useState('');
  const [essayId, setEssayId] = useState('');
  const { id } = useParams(); // Get student ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEssayData = async () => {
      try {
        // Fetch essay data
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/essay`);
        if (response.data && response.data.length > 0) {
          const essayData = response.data[0];
          setQuestion(essayData.soal);
          setCorrectAnswer(essayData.kunci);
          setEssayId(essayData._id);

          // Fetch student name and answers
          if (id) {
            const studentResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/${id}`);
            if (studentResponse.data) {
              setStudentName(studentResponse.data.namaSiswa);
              setAnswers(studentResponse.data.essay || []);
            }
          }
        } else {
          console.warn('No data found');
        }
      } catch (error) {
        console.error('Error fetching essay data:', error);
      }
    };

    fetchEssayData();

    // // Listen for answer submissions
    // socket.on('answerSubmitted', (data) => {
    //   if (data.soal === essayId) {
    //     setAnswers(prevAnswers => [...prevAnswers, { ...data, namaSiswa: data.namaSiswa }]);
    //   }
    // });

    // Clean up on component unmount
    // return () => {
    //   socket.off('answerSubmitted');
    // };
  }, [id, essayId]);

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (userAnswer.trim() === '') return;

    const similarity = stringSimilarity.compareTwoStrings(userAnswer, correctAnswer);
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const position = getRandomPosition();

    const newAnswer = { text: userAnswer, similarity, color, position, namaSiswa: studentName };
    setAnswers([...answers, newAnswer]);
    setUserAnswer('');

    // Post user answer to the API
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}api/siswa`, {
        namaSiswa: studentName,
        essay: [{ jawabanSiswa: userAnswer, skorEssay: similarity, soal: essayId }]
      });

      // Emit answer submission event
      // socket.emit('submitAnswer', { text: userAnswer, similarity, color, position, soal: essayId, namaSiswa: studentName });
    } catch (error) {
      console.error('Error posting user answer:', error);
    }
  };

  const handleShowAnswerKey = async () => {
    setShowAnswerKey(true);
    setShowForm(false);
    setSortedAnswers(
      answers.sort((a, b) => b.similarity - a.similarity) // Sort by similarity
    );
  
    // Update answers in the API
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/siswa/${id}`, {
        essay: answers.map(answer => ({
          jawabanSiswa: answer.text,
          skorEssay: answer.similarity,
          soal: essayId
        }))
      });
      console.log('Answers updated successfully');
    } catch (error) {
      console.error('Error updating student answers:', error);
    }
  };
  


  const getRandomPosition = () => {
    const maxTop = 80; // Max vertical position
    const maxLeft = 30; // Max horizontal position from left

    const left = Math.random() > 0.5 ? `${Math.random() * maxLeft}%` : `calc(100% - ${Math.random() * maxLeft}%)`;
    const top = `${Math.random() * maxTop}%`;

    return { top, left };
  };

  return (
    <div className="relative flex flex-col items-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center w-full max-w-4xl mt-10">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          {question}
        </h1>
        {!showAnswerKey && showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg">
            <input
              type="text"
              value={userAnswer}
              onChange={handleChange}
              className="border border-gray-300 p-2 w-full mb-4 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Ketik jawaban Anda di sini"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
            >
              Submit
            </button>
            <button
              type="button"
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
            <p>{correctAnswer}</p>
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
              ({answer.similarity.toFixed(2)})
            </div>
          </div>
        ))}
        {showAnswerKey && (
          <button
            onClick={() => navigate(`/tipe-soal/${id}`)}
            className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition mt-8"
          >
            Kembali ke Halaman Awal
          </button>
        )}
      </div>

      {/* Area untuk jawaban acak di luar form dan pertanyaan */}
      {!showAnswerKey && (
        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {answers.map((answer, index) => (
            <div
              key={index}
              className="p-2 rounded-md bg-white shadow-lg text-center mb-4"
              style={{
                color: answer.color,
                position: 'absolute',
                ...answer.position,
              }}
            >
              <span className="font-semibold text-lg">{answer.text}</span>
              <div className="text-sm text-gray-600 mt-1">
                ({answer.namaSiswa})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Essay;
