import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PilihanGandaPage = () => {
  const { id } = useParams(); // Extract the id from URL params
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [username, setUsername] = useState('');
  const [answerSummary, setAnswerSummary] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/pilihanGanda`);
        console.log('Questions fetched:', response.data); // Debugging
        setQuestions(response.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setError('Failed to load questions.');
      }
    };

    const fetchUsername = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/${id}`);
        console.log('Username fetched:', response.data); // Debugging
        setUsername(response.data.namaSiswa);
      } catch (error) {
        console.error('Error fetching username:', error);
        setError('Failed to load username.');
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchQuestions(), fetchUsername()]);
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, [id]);

  const handleAnswerChange = (selectedOption) => {
    console.log('Selected Option:', selectedOption); // Debugging
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    console.log('Current Question Index:', currentQuestionIndex); // Debugging
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      submitAnswers();
      setSubmitted(true);
    }
  };

  const calculateScore = () => {
    console.log('Calculating Score'); // Debugging
    const numQuestions = questions.length;
    let newScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.kunci) {
        newScore += 100 / numQuestions;
      }
    });
    setScore(newScore);
  };

  const submitAnswers = async () => {
    const numQuestions = questions.length;
    const answersToSubmit = questions.map((q, index) => ({
      jawabanSiswa: userAnswers[index] || '',
      skorPilihanGanda: userAnswers[index] === q.kunci ? (100 / numQuestions) : 0,
      soal: q._id, // Assuming the question has an `_id` field
    }));

    // Generate answer summary
    const summary = questions.map((q, index) => ({
      nomor: index + 1,
      benar: userAnswers[index] === q.kunci,
    }));

    setAnswerSummary(summary);

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/siswa/${id}`, {
        namaSiswa: username, // Use the fetched username
        pilihanGanda: answersToSubmit,
        skorPilihanGanda: score
      });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError('Failed to submit answers.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  // Calculate progress
  const progress = (currentQuestionIndex + 1) / questions.length * 100;

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full bg-teal-600 text-white py-4 px-6 shadow-md z-10">
        <h1 className="text-3xl font-bold text-center">Soal Pilihan Ganda</h1>
      </header>
      
      {/* Progress Bar */}
      <div className="fixed top-16 left-0 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 z-10">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
  
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/6701110.jpg?alt=media&token=7faa5439-3d9b-4dca-9498-ce54bfaaa2bb')" }}
      ></div>
  
      {/* Content Area */}
      <div className="relative flex flex-col items-center justify-center min-h-screen pb-20 z-20">
        {!submitted ? (
          <>
            {currentQuestion ? (
              <div className="mb-8 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900">{currentQuestion.soal}</h2>
                {currentQuestion.pilihan ? (
                  currentQuestion.pilihan.map((option, i) => (
                    <label
                      key={i}
                      className="block mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition"
                    >
                      <input
                        type="radio"
                        name={`soalPilihanGanda-${currentQuestionIndex}`}
                        value={option}
                        checked={userAnswers[currentQuestionIndex] === option}
                        onChange={() => handleAnswerChange(option)}
                        className="mr-3 accent-blue-500"
                      />
                      <span className="text-lg text-gray-700">{option}</span>
                    </label>
                  ))
                ) : (
                  <p>Loading options...</p>
                )}
              </div>
            ) : (
              <p>Loading...</p>
            )}
            <button
              onClick={handleNextQuestion}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Submit Jawaban'}
            </button>
          </>
        ) : (
          <div className="mt-8 text-2xl font-bold text-gray-800 flex flex-col items-center">
            <p>Terimakasih telah menyelesaikan soal!</p>
            <div className="mt-6 w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Rangkuman Jawaban</h2>
              {answerSummary.map((item, index) => (
                <div
                  key={index}
                  className={`mb-4 p-4 rounded-lg ${item.benar ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  <p className="text-md">{item.nomor}. <span className="font-bold">{item.benar ? 'Benar' : 'Salah'}</span></p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(`/tipe-soal/${id}`)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105 mt-6"
            >
              Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PilihanGandaPage;
