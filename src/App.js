import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PilihanPage from './page/PilihanPage';
import KelompokSiswaPage from './page/KelompokSiswaPage';
import PilihanGandaPage from './page/PilihanGandaPage';
import TanyaJawabEssay from './page/Essay';
import PilihTipeSoal from './page/PilihTipeSoal';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PilihanPage />} />
        <Route path="/kelompok-siswa" element={<KelompokSiswaPage />} />
        <Route path="/tipe-soal" element={<PilihTipeSoal />} />
        <Route path="/pilihan-ganda" element={<PilihanGandaPage />} />
        <Route path="/tanya-jawab-essay" element={<TanyaJawabEssay />} />
      </Routes>
    </Router>
  );
};

export default App;
