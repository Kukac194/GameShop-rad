import React, { useEffect, useState } from 'react';
import IgricaService from '../../services/IgricaService';
import { Link } from 'react-router-dom';
import './IgriceLista.css';

function ListaIgrica() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const fetchGames = async () => {
        try {
          const data = await IgricaService.dohvatiSveIgrice();
          setGames(data);
          setLoading(false);
        } catch (err) {
          console.error("Greška prilikom dohvaćanja igrica:", err);
          setError('Greška prilikom dohvaćanja igrica');
          setLoading(false);
        }
      };
  
      fetchGames();
    }, []);
  
    const filteredGames = games.filter(game =>
      game.naslov.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (loading) return <div className="loading">Učitavanje...</div>;
    if (error) return <div className="error">{error}</div>;
  
    return (
      <div className="game-list-container">
        <h1 className="title">Popis Igrica</h1>
        
        <input
          type="text"
          placeholder="Pretraži igre po naslovu"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <ul className="game-list">
          {filteredGames.length > 0 ? (
            filteredGames.map((game) => (
              <li key={game.id} className="game-item">
                <h2 className="game-title-first"><Link to={`/igrice/${game.id}`}>{game.naslov}</Link></h2>
                <p className="game-producer">Proizvođač ID: {game.proizvodacId}</p>
                <p className="game-price">Cijena: {game.cijena} €</p>
                
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
