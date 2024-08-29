import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaTrash } from 'react-icons/fa'; // Import icons

const DaftarNilai = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Fetch data from the updated endpoint
                const response = await axios.get(`${process.env.REACT_APP_API_URL}api/siswa/result`);
                setStudents(response.data);
            } catch (error) {
                setError('Error fetching student data');
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudents();
    }, []);

    const formatScore = (score) => {
        if (score === undefined || score === null) {
            return '0,00'; // Default to '0,00' if no score is provided
        }
        return score.toFixed(0).replace('.', ','); // Replace dot with comma
    };

    const handleBackClick = () => {
        // Handle the back button click, e.g., redirect to another page
        window.history.back(); // Simple example to go back in browser history
    };

    const handleDelete = async (studentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this student?");
        if (confirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}api/siswa/${studentId}`);
                setStudents(students.filter(student => student._id !== studentId)); // Remove student from state
            } catch (error) {
                setError('Error deleting student');
                console.error('Error deleting student:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="bg-white shadow-md p-6 rounded-md w-full max-w-4xl">
                <header className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 text-center">Daftar Nilai</h1>
                </header>

                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                    onClick={handleBackClick}
                    className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                >
                    <FaArrowLeft className="mr-2" />
                    Kembali
                </button>
                <table className="min-w-full bg-white shadow-md rounded-md border-collapse mx-auto ">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Nama Siswa</th>
                            <th className="py-2 px-4 border-b text-left">Total Skor Pilihan Ganda</th>
                            <th className="py-2 px-4 border-b text-left">Skor Essay Tertinggi</th>
                            <th className="py-2 px-4 border-b text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b text-center">{student.namaSiswa}</td>
                                    <td className="py-2 px-4 border-b text-center">{formatScore(student.totalSkorPilihanGanda)}</td>
                                    <td className="py-2 px-4 border-b text-center">{formatScore(student.highestSkorEssay * 100 || 0)}</td>
                                    <td className="py-2 px-4 border-b text-center">
                                        <button
                                            onClick={() => handleDelete(student._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="py-2 px-4 border-b text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DaftarNilai;
