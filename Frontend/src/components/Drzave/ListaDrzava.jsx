import React, { useEffect, useState } from 'react';
import IgricaService from '../../services/IgricaService';
import ProizvodacService from '../../services/ProizvodacService';
import DrzavaService from '../../services/DrzavaService';
import { Link } from 'react-router-dom';
import '../Proizvodaci/PopisProizvodaca.css';

function ListaDrzava() {
    const [drzave, setDrzave] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchDrzave = async () => {
        try {
          const data = await DrzavaService.dohvatiSveDrzave();
          setDrzave(data);
          setLoading(false);
        } catch (err) {
          console.error("Greška prilikom dohvaćanja država:", err);
          setError('Greška prilikom dohvaćanja država');
          setLoading(false);
        }
      };
  
      fetchDrzave();
    }, []);
  
    const filteredDrzave = drzave.filter(drzava =>
      drzava.naziv.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (loading) return <div className="loading">Učitavanje...</div>;
    if (error) return <div className="error">{error}</div>;
  
    return (
      <div className="game-list-container">
        <h1 className="title">Popis država</h1>
        
        <input
          type="text"
          placeholder="Pretraži državu po imenu"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <ul className="game-list">
          {filteredDrzave.length > 0 ? (
            filteredDrzave.map((drzava) => (
              <li key={drzava.id} className="game-item">
                <h2 className="man-title">{drzava.naziv}</h2>
                <p className="game-producer"><Link to={`/proizvodaci/drzave/${drzava.id}`}>Pregledaj proizvođače</Link></p>
              </li>
            ))
          ) : (
            <li className="no-results">Nema rezultata za pretragu</li>
          )}
        </ul>
      </div>
    );
}

export default ListaDrzava;
