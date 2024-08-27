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

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}api/siswa/${id}`, {
        namaSiswa: username, // Use the fetched username
        pilihanGanda: answersToSubmit,
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Soal Pilihan Ganda</h1>

          {currentQuestion ? (
            <div className="mb-6 w-full max-w-xl">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.soal}</h2>
              {currentQuestion.pilihan ? (
                currentQuestion.pilihan.map((option, i) => (
                  <label key={i} className="block mb-2">
                    <input
                      type="radio"
                      name={`soalPilihanGanda-${currentQuestionIndex}`}
                      value={option}
                      checked={userAnswers[currentQuestionIndex] === option}
                      onChange={() => handleAnswerChange(option)}
                      className="mr-2"
                    />
                    {option}
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
            className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Submit Jawaban'}
          </button>
        </>
      ) : (
        <div className="mt-6 text-xl font-bold text-gray-800">
          Terimakasih
          <button
            onClick={() => navigate(`/tipe-soal/${id}`)} // Pass id as state
            className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition ml-4"
          >
            Kembali
          </button>
        </div>
      )}
    </div>
  );
};

export default PilihanGandaPage;
