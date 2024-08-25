import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import PilihanGandaPage from './page/PilihanGandaPage';
import DashboardGuru from './page/guru/GuruDashboard';
import TanyaJawabEssay from './page/Essay';
import TambahMenu from './page/guru/TambahMenu';
import PilihTipeSoal from './page/PilihTipeSoal';
import Landingpage from './page/Landingpage';
import ContentPage from './page/contents/ContentPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/dashboard" element={<DashboardGuru />} />
        <Route path="/petunjuk" element={<ContentPage />} />
        <Route path="/menusoal" element={<TambahMenu />} />
        <Route path="/tipe-soal" element={<PilihTipeSoal />} />
        <Route path="/pilihan-ganda" element={<PilihanGandaPage />} />
        <Route path="/tanya-jawab-essay" element={<TanyaJawabEssay />} />
      </Routes>
    </Router>
  );
};

export default App;
