import React, { useEffect, useState } from 'react';
import IgricaService from '../../services/IgricaService';
import { Link } from 'react-router-dom';
import './IgriceLista.css';
import '../Utils/spinner.css';

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
  
    if (loading) return <div className="spinner"></div>;
    if (error) return <div className="error">{error}</div>;
  
    return (
      <div className="game-list-container">
        <div className='c'>
          <h1 className="title">Popis Igrica</h1>
          <Link to="/nova-igrica" className='add-button'>Dodaj novu igricu</Link>
        </div>
        
        <input
          type="text"
          placeholder="Pretraži igre po naslovu"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="game-list">
          {filteredGames.length > 0 ? (
            filteredGames.reduce((rows, game, index) => {
              if (index % 2 === 0) {
                rows.push([]);
              }
              rows[rows.length - 1].push(game);
              return rows;
            }, []).map((row, rowIndex) => (
              <div className="game-row" key={rowIndex}>
                {row.map((game) => (
                  <div key={game.id} className="game-item">
                    <strong>
                      <h2 className="game-title-first">
                        <Link to={`/igrice/${game.id}`}>{game.naslov}</Link>
                      </h2>
                    </strong>
                    <img className="game-picture" src={game.slika} alt={game.naslov} />
                    <p className='game-price'>Godina izdanja: {game.godinaIzdanja}</p>
                    <p className="game-price">Cijena: {game.cijena} €</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="no-results">Nema rezultata za pretragu</div>
          )}
        </div>
      </div>
    );
}

export default ListaIgrica;
