import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PilihanGandaPage from './page/PilihanGandaPage';
import DashboardGuru from './page/guru/GuruDashboard';
import TanyaJawabEssay from './page/Essay';
import TambahMenu from './page/guru/TambahMenu';
import PilihTipeSoal from './page/PilihTipeSoal';
import Landingpage from './page/Landingpage';
import ContentPage from './page/contents/ContentPage';
import TambahSoal from './page/guru/TambahSoal';
import DaftarNilai from './page/guru/DaftarNilai';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<DashboardGuru />} />
        <Route path="/petunjuk" element={<ContentPage />} />
        <Route path="/tambah-soal" element={<TambahSoal />} />
        <Route path="/daftar-nilai" element={<DaftarNilai />} />
        <Route path="/tipe-soal/:id" element={<PilihTipeSoal />} />
        <Route path="/menusoal/:id" element={<TambahMenu />} />
        <Route path="/pilihan-ganda/:id" element={<PilihanGandaPage />} />
        <Route path="/tanya-jawab-essay/:id" element={<TanyaJawabEssay />} />
      </Routes>
    </Router>
  );
};

export default App;
