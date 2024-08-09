import React, { useState } from 'react';

const PilihanGandaPage = () => {
  // Soal-soal pilihan ganda
  const questions = [
    {
      question: 'Apa yang dimaksud dengan ekosistem?',
      options: [
        'Kumpulan individu sejenis yang hidup di suatu wilayah.',
        'Interaksi antara makhluk hidup dan lingkungan sekitarnya.',
        'Proses perpindahan energi dari satu makhluk hidup ke makhluk hidup lainnya.',
        'Tempat tinggal makhluk hidup yang spesifik.',
      ],
      correctAnswer: 'Interaksi antara makhluk hidup dan lingkungan sekitarnya.',
    },
    {
      question: 'Mana yang termasuk dalam komponen abiotik dalam ekosistem?',
      options: [
        'Tumbuhan',
        'Hewan',
        'Matahari',
        'Bakteri',
      ],
      correctAnswer: 'Matahari',
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
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setSubmitted(true);
    }
  };

  const calculateScore = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.correctAnswer) {
        newScore += 100 / questions.length;
      }
    });
    setScore(newScore);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!submitted ? (
        <>
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Soal Pilihan Ganda</h1>
          <div className="mb-6 w-full max-w-xl">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
            {currentQuestion.options.map((option, i) => (
              <label key={i} className="block mb-2">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
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
            {currentQuestionIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Submit Jawaban'}
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
