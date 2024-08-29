import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PilihanGandaPage from './page/PilihanGandaPage';
import DashboardGuru from './page/guru/GuruDashboard';
import TanyaJawabEssay from './page/Essay';
import TambahMenu from './page/guru/TambahMenu';
import PilihTipeSoal from './page/PilihTipeSoal';
import Landingpage from './page/Landingpage';
import TambahSoal from './page/guru/TambahSoal';
import DaftarNilai from './page/guru/DaftarNilai';
import Pedoman from './page/Pedoman';
import MateriAjar from './page/MateriAjar';
import EditSoal from './page/EditSoal';
import DaftarKonten from './page/DaftarKonten';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<DashboardGuru />} />
        <Route path="/tambah-soal" element={<TambahSoal />} />
        <Route path="/edit-soal/essay/:idsoal" element={<EditSoal />} />
        <Route path="/edit-soal/pilihan-ganda/:idsoal" element={<EditSoal />} />
        <Route path="/kelola-konten" element={<DaftarKonten />} />
        <Route path="/daftar-nilai" element={<DaftarNilai />} />
        <Route path="/petunjuk/:id" element={<Pedoman />} />
        <Route path="/materi-ajar/:id" element={<MateriAjar />} />
        <Route path="/tipe-soal/:id" element={<PilihTipeSoal />} />
        <Route path="/menusoal/:id" element={<TambahMenu />} />
        <Route path="/pilihan-ganda/:id" element={<PilihanGandaPage />} />
        <Route path="/tanya-jawab-essay/:id" element={<TanyaJawabEssay />} />
      </Routes>
    </Router>
  );
};

export default App;
