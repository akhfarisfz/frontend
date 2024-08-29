  import React, { useState, useEffect } from 'react';
  import { useNavigate, useParams } from 'react-router-dom';
  import stringSimilarity from 'string-similarity';
  import axios from 'axios';
  import Pusher from 'pusher-js';

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
    const [isDisabled, setIsDisabled] = useState(false); // State for disabling input
    const { id } = useParams(); // Get student ID from URL params
    const navigate = useNavigate();

    useEffect(() => {
      const fetchEssayData = async () => {
        try {
          // Fetch essay data
          const essayResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/essay`);
          if (essayResponse.data && essayResponse.data.length > 0) {
            const essayData = essayResponse.data[0];
            setQuestion(essayData.soal);
            setCorrectAnswer(essayData.kunci);
            setEssayId(essayData._id);

            // Fetch student name and answers
            if (id) {
              const studentResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/${id}`);
              if (studentResponse.data) {
                setStudentName(studentResponse.data.namaSiswa);
                const studentEssay = studentResponse.data.essay || [];

                // Log studentEssay to verify its structure
                console.log('Student Essay Data:', studentEssay[0].soal._id);

                // Check if the student has submitted an answer for the current essay question
                const hasSubmittedAnswer = studentEssay.some(answer => answer.soal._id === essayId);
                console.log(hasSubmittedAnswer);
                setShowForm(true); // Show form if the answer is not submitted
                setIsDisabled(hasSubmittedAnswer); // Disable input if the answer is already submitted
              }
            }

            // Fetch all students data

            const allStudentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa`);
            const allStudents = allStudentsResponse.data;

            // Filter and map student data to include only those with essay answers for this question
            const filteredAnswers = allStudents
              .map(student => {
                const studentEssay = student.essay.find(essay => essay.soal === essayId);
                if (studentEssay) {
                  return {
                    text: studentEssay.jawabanSiswa,
                    similarity: studentEssay.skorEssay,
                    idSoal: studentEssay.soal,
                    namaSiswa: student.namaSiswa,
                    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
                    position: getRandomPosition(),
                  };
                }
                return null;
              })
              .filter(answer => answer !== null);

            setAnswers(filteredAnswers);
          } else {
            console.warn('No data found');
          }
        } catch (error) {
          console.error('Error fetching essay data:', error);
        }
      };

      fetchEssayData();

      // Initialize Pusher
      const pusher = new Pusher('eb9edb341b864a7ef56e', {
        cluster: 'ap1',
        useTLS: true,
      });

      // Subscribe to the channel
      const channel = pusher.subscribe('my-channel');
      channel.bind('answerSubmitted', (data) => {
        console.log('Event received:', data);
        if (data.soal === essayId) {
          setAnswers(prevAnswers => [...prevAnswers, { ...data, namaSiswa: data.namaSiswa }]);
        }
      });

      // Clean up on component unmount
      return () => {
        pusher.unsubscribe('my-channel');
      };
    }, [id, essayId]);

    const handleChange = (e) => {
      setUserAnswer(e.target.value);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (userAnswer.trim() === '') return;

      const hasSubmittedAnswer = answers.some(answer => answer.soal === essayId && answer.namaSiswa === studentName);
      if (hasSubmittedAnswer) {
        console.warn('You have already submitted an answer for this question.');
        return;
      }

      const similarity = stringSimilarity.compareTwoStrings(userAnswer, correctAnswer);
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const position = getRandomPosition();

      const newAnswer = { text: userAnswer, similarity, color, position, namaSiswa: studentName };
      setAnswers([...answers, newAnswer]);
      setUserAnswer('');
      setIsDisabled(true); // Disable input after submission

      try {
        await axios.post(`${process.env.REACT_APP_API_URL}api/submitAnswer`, {
          text: userAnswer,
          similarity,
          color,
          position,
          soal: essayId,
          namaSiswa: studentName
        });

        await axios.put(`${process.env.REACT_APP_API_URL}api/siswa/${id}`, {
          essay: [
            {
              jawabanSiswa: userAnswer,
              skorEssay: similarity,
              soal: essayId,
            },
          ],
        });

        setShowForm(true); // Hide form after submission
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
    };

    const getRandomPosition = () => {
      const padding = 20; // Padding from the edges of the screen

      // Get the viewport width and height
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate available width and height considering padding
      const availableWidth = viewportWidth - 2 * padding;
      const availableHeight = viewportHeight - 2 * padding;

      // Generate random position within the available width and height
      const left = Math.random() * availableWidth + padding;
      const top = Math.random() * availableHeight + padding;

      return { top: `${top}px`, left: `${left}px` };
    };


    return (
      <div className="relative flex flex-col items-center min-h-screen bg-gray-100"
        style={{
          backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/sddasanlekong.appspot.com/o/3838986.jpg?alt=media&token=845c9b69-9052-40b1-b605-eb185a40f1b0')",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        {/* Header Section */}
        <header className="bg-teal-600 text-white w-full py-4 px-6 shadow-md">
          <h1 className="text-3xl font-bold">Esai</h1>
        </header>
        <div className="relative flex flex-col items-center w-full max-w-4xl mt-10">
          <h1 className="text-3xl font-bold ">Halo {studentName}, silahkan menjawab soal</h1>
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            {question}
          </h1>
          {!showAnswerKey && showForm && (
            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-lg">
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
                ({answer.similarity !== undefined ? answer.similarity.toFixed(2) : 'N/A'})
              </div>
            </div>
          ))}
          {showAnswerKey && (
            <button
              onClick={() => navigate(`/tipe-soal/${id}`)}
              className="bg-blue-500 text-white p-4 rounded-md shadow hover:bg-blue-600 transition mt-8"
            >
              Kembali ke Halaman Menu
            </button>
          )}
        </div>

        {/* Area untuk jawaban acak di luar form dan pertanyaan */}
        {!showAnswerKey && (
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {answers.map((answer, index) => (
              <div
                key={index}
                className="p-4 rounded-lg shadow-lg text-center mb-4 transform transition-transform hover:scale-105"
                style={{
                  backgroundColor: answer.color,
                  color: '#fff',
                  position: 'absolute',
                  ...answer.position,
                  border: '2px solid #fff',
                  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                <span className="font-bold text-xl">{answer.text}</span>
                <div className="text-sm text-gray-200 mt-2">
                  <i>{answer.namaSiswa}</i>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    );
  };

  export default Essay;
