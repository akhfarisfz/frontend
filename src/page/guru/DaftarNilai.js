import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaTrash, FaFilePdf } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const DaftarNilai = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');
    const [selectedCycle, setSelectedCycle] = useState(1); // Default siklus 1

    useEffect(() => {
        const fetchStudents = async () => {
            try {
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
            return '0,00';
        }
        return score.toFixed(0).replace('.', ',');
    };

    const handleBackClick = () => {
        window.history.back();
    };

    const handleDelete = async (studentId) => {
        const confirmed = window.confirm("Are you sure you want to delete this student?");
        if (confirmed) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}api/siswa/${studentId}`);
                setStudents(students.filter(student => student._id !== studentId));
            } catch (error) {
                setError('Error deleting student');
                console.error('Error deleting student:', error);
            }
        }
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text('Daftar Nilai Siswa', doc.internal.pageSize.getWidth() / 2, 16, { align: 'center' });
        doc.setFontSize(14);
        doc.text(`Siklus ${selectedCycle}`, doc.internal.pageSize.getWidth() / 2, 24, { align: 'center' });
        doc.autoTable({
            startY: 30,
            head: [['Nama Siswa', 'Total Skor Pilihan Ganda', 'Skor Essay Tertinggi']],
            body: students.map(student => [
                student.namaSiswa,
                formatScore(student.totalSkorPilihanGanda),
                formatScore(student.highestSkorEssay * 100 || 0),
            ]),
        });
        doc.save(`daftar-nilai-siswa-siklus-${selectedCycle}.pdf`);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
            <div className="bg-white shadow-md p-6 rounded-md w-full max-w-4xl">
                <header className="mb-6 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800 text-center w-full">Daftar Nilai</h1>
                    <button
                        onClick={handleExportPDF}
                        className="flex items-center text-red-500 hover:text-red-700"
                    >
                        <FaFilePdf className="mr-2" />
                        Export to PDF
                    </button>
                </header>

                {error && <p className="text-red-500 text-center">{error}</p>}
                <button
                    onClick={handleBackClick}
                    className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
                >
                    <FaArrowLeft className="mr-2" />
                    Kembali
                </button>
                <div className="flex items-center space-x-4">
                        <label htmlFor="cycle" className="text-gray-700 font-medium">Siklus:</label>
                        <select
                            id="cycle"
                            value={selectedCycle}
                            onChange={(e) => setSelectedCycle(Number(e.target.value))}
                            className="border rounded-md p-2"
                        >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                        </select>
                    </div>
                <table className="min-w-full bg-white shadow-md rounded-md border-collapse mx-auto">
                    <thead>
                        <tr>
                            <th className="py-2 px-2 border-b text-left">Nama Siswa</th>
                            <th className="py-2 px-2 border-b text-left">Total Skor Pilihan Ganda</th>
                            <th className="py-2 px-2 border-b text-left">Skor Essay Tertinggi</th>
                            <th className="py-2 px-2 border-b text-left">Action</th>
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
