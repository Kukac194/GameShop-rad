import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProizvodacService from '../../services/ProizvodacService';
import DrzavaService from '../../services/DrzavaService';
import './DodajProizvodaca.css';

function DodajProizvodaca() {
    const navigate = useNavigate();
    const [proizvodac, setProizvodac] = useState({ ime: '', drzavaId: '' });
    const [drzave, setDrzave] = useState([]);

    useEffect(() => {
        const fetchDrzave = async () => {
            try {
                const response = await DrzavaService.dohvatiSveDrzave();
                setDrzave(response);
            } catch (error) {
                console.error('Greška prilikom dohvaćanja država:', error);
            }
        };

        fetchDrzave();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProizvodac(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ProizvodacService.dodajProizvodaca(proizvodac);
            alert('Novi proizvođač je uspješno dodan.');
            navigate('/proizvodaci');
        } catch (error) {
            console.error('Greška prilikom dodavanja proizvođača:', error);
        }
    };

    return (
<div className="create-manufacturer-form">
    <h1>Dodaj novog proizvođača</h1>
    <form onSubmit={handleSubmit}>
        <label htmlFor="ime">Ime:</label>
        <input
            type="text"
            id="ime"
            name="ime"
            value={proizvodac.ime}
            onChange={handleChange}
            required
        />

        <label htmlFor="drzavaId">Država:</label>
            <select
                id="drzavaId"
                name="drzavaId"
                value={proizvodac.drzavaId}
                onChange={handleChange}
                required
            >
                <option value="">Odaberite državu</option>
                {drzave.map(drzava => (
                    <option key={drzava.id} value={drzava.id}>
                        {drzava.naziv}
                    </option>
                ))}
            </select>
        <button type="submit">Dodaj</button>
    </form>
</div>


    );
}

export default DodajProizvodaca;
