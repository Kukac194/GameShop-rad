import React, { useEffect, useState } from 'react';
import IgricaService from '../../services/IgricaService';
import ProizvodacService from '../../services/ProizvodacService';
import DrzavaService from '../../services/DrzavaService';
import { Link } from 'react-router-dom';
import '../Proizvodaci/PopisProizvodaca.css';
import '../Utils/spinner.css';

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
  
    const handleDelete = async (id) => {
      if (window.confirm("Želite li zaista izbrisati ovu državu?")) {
          try {
              await DrzavaService.obrisiDrzavu(id);
              setDrzave(prev => prev.filter(drzava => drzava.id !== id));
              alert("Država je uspješno izbrisana.");
          } catch (err) {
              console.error("Greška prilikom brisanja države:", err);
              alert('Greška prilikom brisanja države');
          }
      }
  };


    if (loading) return <div className="spinner"></div>;
    if (error) return <div className="error">{error}</div>;
  
    return (
      <div className="game-list-container">
                  <div className='c'>
            <h1 className="title">
                Popis država 
            </h1>
            <Link to="/drzave/dodaj-drzavu" className="add-button">Dodaj državu</Link>
            </div>
        
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
                <Link to={`/drzave/${drzava.id}/azuriraj`} className="update-button">Ažuriraj</Link>
                <button className="delete-button" onClick={() => handleDelete(drzava.id)}>Izbriši</button>
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
