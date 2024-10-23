import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IgricaService from '../../services/IgricaService';
import ProizvodacService from '../../services/ProizvodacService';
import './KreirajIgricuForma.css';
import '../Utils/spinner.css';

function KreirajIgricuForma() {
  const navigate = useNavigate();
  const [game, setGame] = useState({ naslov: '', cijena: '', proizvodacId: '' });
  const [proizvodaci, setProizvodaci] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProizvodaci = async () => {
      try {
        const response = await ProizvodacService.dohvatiSveProizvodace();
        setProizvodaci(response);
        setLoading(false);
      } catch (error) {
        console.error('Greška prilikom dohvaćanja proizvođača:', error);
        setLoading(false);
      }
    };
  
    fetchProizvodaci();
  }, []);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    IgricaService.dodajIgricu(game)
      .then(() => {
        alert('Nova igrica je uspješno kreirana.');
        navigate('/igrice');
      })
      .catch(error => {
        console.error('Greška prilikom kreiranja igrice:', error);
      });
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div className="create-game-form">
      <h1>Kreiraj novu igricu</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Naslov:
          <input
            type="text"
            name="naslov"
            value={game.naslov}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Cijena:
          <input
            type="number"
            name="cijena"
            value={game.cijena}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Godina izdanja:
          <input
            type="text"
            name="godinaIzdanja"
            value={game.godinaIzdanja}
            onChange={handleChange}
            required
          />
        </label>
          Proizvođač:
          <select
            name="proizvodacId"
            value={game.proizvodacId}
            onChange={handleChange}
            required
          >
            <option value="">Odaberite proizvođača</option>
            {proizvodaci.map(proizvodac => (
              <option key={proizvodac.id} value={proizvodac.id}>
                {proizvodac.ime}
              </option>
            ))}
          </select>
        <button type="submit">Kreiraj</button>
      </form>
    </div>
  );
}

export default KreirajIgricuForma;
