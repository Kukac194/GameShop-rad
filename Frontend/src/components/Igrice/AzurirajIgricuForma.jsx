import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IgricaService from '../../services/IgricaService';
import ProizvodacService from '../../services/ProizvodacService';
import './AzurirajIgricuForma.css';

function AzurirajIgricuForma() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState({ naslov: '', cijena: '', proizvodacId: '' });
  const [proizvodaci, setProizvodaci] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    IgricaService.dohvatiIgricuPoIdu(id)
      .then(response => {
        setGame(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja igrice:', error);
        setLoading(false);
      });

    ProizvodacService.dohvatiSveProizvodace()
      .then(response => {
        setProizvodaci(response);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja proizvođača:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGame(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    IgricaService.azurirajIgricu(id, game)
      .then(() => {
        alert('Igrica uspješno ažurirana.');
        navigate(`/igrice/${id}`);
      })
      .catch(error => {
        console.error('Greška prilikom ažuriranja igrice:', error);
      });
  };

  if (loading) {
    return <div className="loading">Učitavanje...</div>;
  }

  return (
    <div className="update-game-form">
      <h1>Ažuriraj Igricu</h1>
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
            type="number"
            name="godinaIzdanja"
            value={game.godinaIzdanja}
            onChange={handleChange}
            required
          />
        </label>
        <label>
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
        </label>
        <button type="submit">Ažuriraj</button>
      </form>
    </div>
  );
}

export default AzurirajIgricuForma;
