import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import IgricaService from '../../services/IgricaService';
import ProizvodacService from '../../services/ProizvodacService';
import RecenzijeService from '../../services/RecenzijeService';
import './IgriceDetalji.css';

function IgricaDetalji() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [manufacturer, setManufacturer] = useState(null);
  const [recenzije, setRecenzije] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editText, setEditText] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [isAddingReview, setIsAddingReview] = useState(false);

  useEffect(() => {
    IgricaService.dohvatiIgricuPoIdu(id)
      .then(response => {
        setGame(response);
        return ProizvodacService.dohvatiProizvodacaPoIdu(response.proizvodacId);
      })
      .then(response => {
        setManufacturer(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja proizvođača:', error);
        setLoading(false);
      });

    RecenzijeService.dohvatiSveRecenzije(id)
      .then(response => {
        setRecenzije(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Greška prilikom dohvaćanja recenzija:', error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = (recenzijaId) => {
    const confirmDelete = window.confirm('Jeste li sigurni da želite obrisati ovu recenziju?');
    if (confirmDelete) {
      RecenzijeService.obrisiRecenziju(recenzijaId)
        .then(() => {
          alert('Recenzija uspješno obrisana.');
          setRecenzije(recenzije.filter(r => r.id !== recenzijaId));
        })
        .catch(error => {
          console.error('Greška prilikom brisanja recenzije:', error);
        });
    }
  };

  const handleEditClick = (recenzija) => {
    setEditingReviewId(recenzija.id);
    setEditText(recenzija.recenzija);
  };

  const handleEditSubmit = (e, recenzijaId) => {
    e.preventDefault();
    RecenzijeService.azurirajRecenziju(recenzijaId, { recenzija: editText, igricaId: game.id })
      .then(() => {
        alert('Recenzija uspješno ažurirana.');
        setRecenzije(prevRecenzije => prevRecenzije.map(r =>
          r.id === recenzijaId ? { ...r, recenzija: editText } : r
        ));
        setEditingReviewId(null);
        setEditText('');
      })
      .catch(error => {
        console.error('Greška prilikom ažuriranja recenzije:', error);
      });
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    RecenzijeService.dodajRecenziju({ recenzija: newReviewText, igricaId: game.id })
      .then(response => {
        alert('Recenzija uspješno dodana.');
        setRecenzije([...recenzije, response]);
        setNewReviewText('');
        setIsAddingReview(false);
      })
      .catch(error => {
        console.error('Greška prilikom dodavanja recenzije:', error);
      });
  };

  if (loading) {
    return <div className="loading">Učitavanje...</div>;
  }

  if (!game) {
    return <div className="error">Igrica ne postoji</div>;
  }

  return (
    <div className="game-details">
      <div className="game-header">
        <h1 className="game-title">{game.naslov}</h1>
        <button 
          className="add-review-button" 
          onClick={() => setIsAddingReview(!isAddingReview)}
          style={{ marginLeft: '10px' }}
        >
          Dodaj recenziju
        </button>
        {isAddingReview && (
          <form onSubmit={handleAddReview} className="add-review-form">
            <input
              type="text"
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              required
              placeholder="Unesite recenziju"
            />
            <button type="submit">Spremi</button>
          </form>
        )}
      </div>

      {manufacturer && (
        <div className="manufacturer-info">
          <h2 className="manufacturer-title">Proizvođač:</h2>
          <p><strong>Ime:</strong> {manufacturer.ime}</p>
          <p><strong>Država porijekla:</strong> {manufacturer.drzavaId}</p>
        </div>
      )}

      <div className="recenzije">
        <h3>Recenzije:</h3>
        <ul className="recenzije-list">
          {recenzije.map(r => (
            <li key={r.id} className="recenzija-item">
              {editingReviewId === r.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, r.id)} className="edit-form">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    required
                  />
                  <button type="submit">Spremi</button>
                </form>
              ) : (
                <p className="recenzija-text">{r.recenzija}</p>
              )}
              <span 
                className="delete-icon"
                onClick={() => handleDelete(r.id)} 
                style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}
                title="Obriši recenziju"
              >
                ❌
              </span>
              <span 
                className="update-icon"
                onClick={() => handleEditClick(r)} 
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                title="Ažuriraj recenziju"
              >
                ✏️
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="action-buttons">
        <button className="update-button" onClick={() => navigate(`/azuriraj-igricu/${id}`)}>Ažuriraj</button>
        <button className="delete-button" onClick={handleDelete}>Obriši</button>
      </div>
    </div>
  );
}

export default IgricaDetalji;
