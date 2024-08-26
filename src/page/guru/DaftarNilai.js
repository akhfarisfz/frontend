import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa'; // Import the icon
const DaftarNilai = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // Fetch data from the updated endpoint
                const response = await axios.get('http://localhost:4000/api/siswa');
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
    return (
        <div className="min-h-screen bg-gray-100 p-6 flex  justify-center">

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
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b text-center">{student.namaSiswa}</td>
                                    <td className="py-2 px-4 border-b text-center">{formatScore(student.totalSkorPilihanGanda)}</td>
                                    <td className="py-2 px-4 border-b text-center">{formatScore(student.highestSkorEssay * 100 || 0)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="py-2 px-4 border-b text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default DaftarNilai;
