import React, { useEffect, useState } from 'react';
import ProizvodacService from '../../services/ProizvodacService';
import { Link, useNavigate } from 'react-router-dom';
import './PopisProizvodaca.css';
import '../Utils/spinner.css';

function ListaProizvodaca() {
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

    const handleDelete = async (id) => {
        if (window.confirm("Želite li zaista izbrisati ovog proizvođača?")) {
            try {
                await ProizvodacService.obrisiProizvodaca(id);
                setProizvodaci(prev => prev.filter(proizvodac => proizvodac.id !== id));
                alert("Proizvođač je uspješno izbrisan.");
            } catch (err) {
                console.error("Greška prilikom brisanja proizvođača:", err);
                alert('Greška prilikom brisanja proizvođača');
            }
        }
    };

    const filteredProizvodaci = proizvodaci.filter(proizvodac =>
        proizvodac.ime.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div className="spinner"></div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="game-list-container">
          <div className='c'>
            <h1 className="title">
                Popis proizvođača 
            </h1>
            <Link to="/proizvodaci/dodaj-proizvodaca" className="add-button">Dodaj proizvođača</Link>
            </div>
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
                            <Link to={`/proizvodaci/${proizvodac.id}/azuriraj`} className="update-button">Ažuriraj</Link>
                            <button className="delete-button" onClick={() => handleDelete(proizvodac.id)}>Izbriši</button>
                        </li>
                    ))
                ) : (
                    <li className="no-results">Nema rezultata za pretragu</li>
                )}
            </ul>
        </div>
    );
}

export default ListaProizvodaca;
