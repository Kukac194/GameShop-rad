import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DrzavaService from '../../services/DrzavaService';
import './KreirajDrzavu.css';

function DodajDrzavu() {
    const navigate = useNavigate();
    const [drzava, setDrzava] = useState({ naziv: '' });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await DrzavaService.dodajDrzavu(drzava);
            navigate('/drzave');
        } catch (error) {
            console.error('Greška prilikom dodavanja države:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDrzava((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="create-manufacturer-form">
            <h1>Dodaj novu državu</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="naziv">Naziv:</label>
                <input
                    type="text"
                    id="naziv"
                    name="naziv"
                    value={drzava.naziv}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Dodaj</button>
            </form>
        </div>
    );
}

export default DodajDrzavu;
