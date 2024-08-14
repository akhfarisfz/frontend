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
    const maxTop = 80; // Maksimal posisi vertikal
    const maxLeft = 30; // Maksimal posisi horizontal dari kiri

    const left = Math.random() > 0.5 ? `${Math.random() * maxLeft}%` : `calc(100% - ${Math.random() * maxLeft}%)`;
    const top = `${Math.random() * maxTop}%`;

    return { top, left };
  };

  // Fungsi untuk menampilkan kunci jawaban dan mengurutkan jawaban
  const handleShowAnswerKey = () => {
    setShowAnswerKey(true);
    setShowForm(false);
    setSortedAnswers(
      answers
        .sort((a, b) => b.similarity - a.similarity)
    );
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
              (Similarity: {answer.similarity.toFixed(2)})
            </div>
          </div>
        ))}
        {showAnswerKey && (
          <button
            onClick={() => navigate('/tipe-soal')}
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
                (Similarity: {answer.similarity.toFixed(2)})
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Essay;
