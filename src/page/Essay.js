import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stringSimilarity from 'string-similarity';

const Essay = () => {
  const [question] = useState('Apa yang dimaksud dengan ekosistem?');
  const [correctAnswer] = useState('Ekosistem adalah sistem yang terdiri dari makhluk hidup dan lingkungan sekitarnya yang saling berinteraksi.');
  const [userAnswer, setUserAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [sortedAnswers, setSortedAnswers] = useState([]);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  }

  // Fungsi untuk menangani submit
  const handleSubmit = (event) => {
    event.preventDefault();
    if (userAnswer.trim() === '') return;

    const similarity = stringSimilarity.compareTwoStrings(userAnswer, correctAnswer);
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const position = getRandomPosition();

    setAnswers([...answers, { text: userAnswer, similarity, color, position }]);
    setUserAnswer('');
  };

  // Fungsi untuk menentukan posisi acak
  const getRandomPosition = () => {
    const screenSize = 80;
    const excludeCenterSize = 20;

    let top, left;
    do {
      top = Math.random() * screenSize;
      left = Math.random() * screenSize;
    } while (
      (top > (screenSize - excludeCenterSize) / 2 && top < (screenSize + excludeCenterSize) / 2) &&
      (left > (screenSize - excludeCenterSize) / 2 && left < (screenSize + excludeCenterSize) / 2)
    );

    return { top: `${top}%`, left: `${left}%` };
  };

  // Fungsi untuk menampilkan kunci jawaban dan mengurutkan jawaban
  const handleShowAnswerKey = () => {
    setShowAnswerKey(true);
    setShowForm(false);
    setSortedAnswers(
      answers
        .sort((a, b) => b.similarity - a.similarity)
        .map((answer, index) => ({
          ...answer,
          position: { top: `${index * 10 + 10}%`, left: '10%' }
        }))
    );
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col items-center w-full max-w-lg z-10">
        <h1 className={`text-4xl font-bold mb-6 text-gray-800 ${showAnswerKey ? 'fixed top-10' : 'mb-6'}`}>
          {question}
        </h1>
        {!showAnswerKey && showForm && (
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
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
      </div>

      <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
        {showAnswerKey && (
          <div
            style={{ position: 'absolute', top: '10%', left: '10%', width: '80%' }}
            className="p-4 rounded-md bg-yellow-100 shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold mb-2 text-gray-800">Kunci Jawaban</h2>
            <p>{correctAnswer}</p>
          </div>
        )}
        {!showAnswerKey && answers.map((answer, index) => (
          <div
            key={index}
            style={{
              color: answer.color,
              position: 'absolute',
              ...answer.position,
              zIndex: 1,
            }}
            className="p-2 rounded-md bg-white shadow-lg text-center mb-4"
          >
            <span className="font-semibold text-lg">{answer.text}</span>
            <div className="text-sm text-gray-600 mt-1">
              (Similarity: {answer.similarity.toFixed(2)})
            </div>
          </div>
        ))}
        {showAnswerKey && sortedAnswers.map((answer, index) => (
          <div
            key={index}
            style={{ color: answer.color }}
            className="p-2 rounded-md bg-white shadow-lg text-center"
          >
            <span className="font-semibold text-lg">{answer.text}</span>
            <div className="text-sm text-gray-600 mt-1">
              (Similarity: {answer.similarity.toFixed(2)})
            </div>
          </div>
        ))}
      </div>

      {showAnswerKey && (
        <button
          onClick={() => navigate('/tipe-soal')}
          className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition mt-8"
        >
          Kembali ke Halaman Awal
        </button>
      )}
    </div>
  );
};

export default Essay;
