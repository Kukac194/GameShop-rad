import React, { useEffect, useState } from 'react';
import ProizvodacService from '../../services/ProizvodacService';
import { Link, useParams } from 'react-router-dom';
import '../Igrice/IgriceLista.css';

function IgriceProizvodac() {
    const { id } = useParams();
    const [proizvodaci, setProizvodaci] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchProizvodaci = async () => {
        try {
          const data = await ProizvodacService.dohvatiProizvodaceIzDrzave(id);
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
  
    const filteredProizvodaci = proizvodaci.filter(p =>
      p.ime.toLowerCase().includes(searchQuery.toLowerCase())
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
            filteredProizvodaci.map((p) => (
              <li key={p.id} className="game-item">
                <h3 className="game-title-first">{p.ime}</h3>
              </li>
            ))
          ) : (
            <li className="no-results">Nema rezultata za pretragu</li>
          )}
        </ul>
      </div>
    );
}

export default IgriceProizvodac;
