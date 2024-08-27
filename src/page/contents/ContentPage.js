import React from 'react';

const Guidelines = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Pedoman Penggunaan Aplikasi</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Video Tutorial</h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/FQPlEnKav48"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Unduh Pedoman PDF</h2>
        <a
          href="/path/to/your-pdf.pdf"
          download
          className="bg-teal-500 text-white py-2 px-4 rounded-lg shadow hover:bg-teal-600 transition"
        >
          Download PDF
        </a>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Panduan Penggunaan Aplikasi untuk Siswa SD</h2>
        <ul className="list-disc list-inside text-lg">
          <li>Pastikan kamu telah menonton video tutorial di atas.</li>
          <li>Masukkan nama kamu dengan benar saat login.</li>
          <li>Pilih soal yang sesuai dengan pelajaranmu.</li>
          <li>Ikuti instruksi pada setiap soal dengan seksama.</li>
          <li>Jangan takut untuk mencoba lagi jika kamu salah.</li>
          <li>Gunakan fitur "Show Answer Key" hanya jika kamu sudah mencoba menjawab soal.</li>
          <li>Hubungi gurumu jika ada kesulitan dalam menggunakan aplikasi.</li>
        </ul>
      </div>
    </div>
  );
};

export default Guidelines;
