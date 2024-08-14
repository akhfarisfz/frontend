// src/page/PilihanGandaPage.js
import React, { useState } from 'react';

const PilihanGandaPage = () => {
  // Data soal pilihan ganda
  const soalPilihanGanda = [
    { soal: 'Apa warna langit?', kunciJawaban: 'Biru', jawaban: ['Biru', 'Hijau', 'Merah', 'Kuning'] },
    { soal: 'Apa ibukota Indonesia?', kunciJawaban: 'Jakarta', jawaban: ['Jakarta', 'Bandung', 'Surabaya', 'Medan'] },
    {
      soal: 'Apa yang dimaksud dengan ekosistem?',
      jawaban: [
        'Kumpulan individu sejenis yang hidup di suatu wilayah.',
        'Interaksi antara makhluk hidup dan lingkungan sekitarnya.',
        'Proses perpindahan energi dari satu makhluk hidup ke makhluk hidup lainnya.',
        'Tempat tinggal makhluk hidup yang spesifik.',
      ],
      kunciJawaban: 'Interaksi antara makhluk hidup dan lingkungan sekitarnya.',
    },
    {
      soal: 'Mana yang termasuk dalam komponen abiotik dalam ekosistem?',
      jawaban: [
        'Tumbuhan',
        'Hewan',
        'Matahari',
        'Bakteri',
      ],
      kunciJawaban: 'Matahari',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerChange = (selectedOption) => {
    setUserAnswers({
      ...userAnswers,
      [currentQuestionIndex]: selectedOption,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < soalPilihanGanda.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setSubmitted(true);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    soalPilihanGanda.forEach((q, index) => {
      if (userAnswers[index] === q.kunciJawaban) {
        newScore += 100 / soalPilihanGanda.length;
      }
    });
    setScore(newScore);
  };

  const currentQuestion = soalPilihanGanda[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Soal Pilihan Ganda</h1>
          <div className="mb-6 w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.soal}</h2>
            {currentQuestion.jawaban.map((option, i) => (
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
            ))}
          </div>
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
          >
            {currentQuestionIndex < soalPilihanGanda.length - 1 ? 'Soal Berikutnya' : 'Submit Jawaban'}
          </button>
        </>
      ) : (
        <div className="mt-6 text-xl font-bold text-gray-800">
          Skor Anda: {score}
        </div>
      )}
    </div>
  );
};

export default PilihanGandaPage;
