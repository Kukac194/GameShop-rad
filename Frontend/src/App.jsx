import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import IgricaLista from './components/Igrice/IgriceLista';
import IgriceDetalji from './components/Igrice/IgriceDetalji';
import AzurirajIgricuForma from './components/Igrice/AzurirajIgricuForma';
import KreirajIgricuForma from './components/Igrice/KreirajIgricuForma';
import PopisProizvodaca from './components/Proizvodaci/PopisProizvodaca';
import IgriceProizvodac from './components/Proizvodaci/IgriceProizvodac';
import ListaDrzava from './components/Drzave/ListaDrzava';
import ListaProizvodacaIzDrzave from './components/Drzave/ListaProizvodacaIzDrzave';
import KreirajProizvodacaForma from './components/Proizvodaci/KreirajProizvodacaForma';
import AzurirajProizvodacaForma from './components/Proizvodaci/AzurirajProizvodacaForma';
import KreirajDrzavu from './components/Drzave/KreirajDrzavu';
import AzurirajDrzavuForma from './components/Drzave/AzurirajDrzavuForma';
import constants from './assets/constants.js';
import Footer from './components/Footer/Footer.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/" />} />
        <Route path={constants.IGRICE.SVE_IGRICE} element={<IgricaLista />} />
        <Route path={constants.IGRICE.IGRICA_ID} element={<IgriceDetalji />} />
        <Route path={constants.IGRICE.AZURIRAJ_IGRICU} element={<AzurirajIgricuForma />} />
        <Route path={constants.IGRICE.NOVA_IGRICA} element={<KreirajIgricuForma />} />
        <Route path={constants.PROIZVODACI.SVI_PROIZVODACI} element={<PopisProizvodaca />} />
        <Route path={constants.IGRICE.PROIZVODACI} element={<IgriceProizvodac />} />
        <Route path={constants.DRZAVE.SVE_DRZAVE} element={<ListaDrzava />}/>
        <Route path={constants.PROIZVODACI.PROIZVODACI_DRZAVE} element={<ListaProizvodacaIzDrzave />}/>
        <Route path={constants.PROIZVODACI.NOVI_PROIZVODAC} element={<KreirajProizvodacaForma />}/>
        <Route path={constants.PROIZVODACI.AZURIRAJ_PROIZVODACA} element={<AzurirajProizvodacaForma />}/>
        <Route path={constants.DRZAVE.NOVA_DRZAVA} element={<KreirajDrzavu />}/>
        <Route path={constants.DRZAVE.AZURIRAJ_DRZAVU} element={<AzurirajDrzavuForma />}/>

      </Routes>
      <Footer></Footer>
    </Router>
  )
}

export default App;
