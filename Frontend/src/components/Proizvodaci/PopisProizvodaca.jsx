import React, { useEffect, useState } from 'react';
import IgricaService from '../../services/IgricaService';
import ProizvodacService from '../../services/ProizvodacService';
import { Link } from 'react-router-dom';
import './PopisProizvodaca.css';

function ListaIgrica() {
    const [proizvodaci, setProizvodaci] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchProizvodaci = async () => {
        try {
          const data = await ProizvodacService.dohvatiSveProizvodace();
          setProizvodaci(data);
          setLoading(false);
        } catch (err) {
          console.error("Greška prilikom dohvaćanja proizvođača:", err);
          setError('Greška prilikom dohvaćanja proizvođača');
          setLoading(false);
        }
      };
  
      fetchProizvodaci();
    }, []);
  
    const filteredProizvodaci = proizvodaci.filter(proizvodac =>
      proizvodac.ime.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (loading) return <div className="loading">Učitavanje...</div>;
    if (error) return <div className="error">{error}</div>;
  
    return (
      <div className="game-list-container">
        <h1 className="title">Popis proizvođača</h1>
        
        <input
          type="text"
          placeholder="Pretraži proizvođača po imenu"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <ul className="game-list">
          {filteredProizvodaci.length > 0 ? (
            filteredProizvodaci.map((proizvodac) => (
              <li key={proizvodac.id} className="game-item">
                <h2 className="man-title">{proizvodac.ime}</h2>
                <p className="game-producer"><Link to={`/proizvodaci/${proizvodac.id}/igrice`}>Pregledaj igrice</Link></p>
              </li>
            ))
          ) : (
            <li className="no-results">Nema rezultata za pretragu</li>
          )}
        </ul>
      </div>
    );
}

export default ListaIgrica;
