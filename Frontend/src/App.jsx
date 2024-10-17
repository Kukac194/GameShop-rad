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

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/igrice" element={<IgricaLista />} />
        <Route path="/igrice/:id" element={<IgriceDetalji />} />
        <Route path="/azuriraj-igricu/:id" element={<AzurirajIgricuForma />} />
        <Route path="/nova-igrica" element={<KreirajIgricuForma />} />
        <Route path="/proizvodaci" element={<PopisProizvodaca />} />
        <Route path="/proizvodaci/:id/igrice" element={<IgriceProizvodac />} />
        <Route path="/drzave" element={<ListaDrzava />}/>
        <Route path="/proizvodaci/drzave/:id" element={<ListaProizvodacaIzDrzave />}/>

      </Routes>
    </Router>
  )
}

export default App;
