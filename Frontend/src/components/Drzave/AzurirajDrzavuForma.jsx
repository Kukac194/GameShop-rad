import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DrzavaService from '../../services/DrzavaService';
import './AzurirajDrzavu.css';
import '../Utils/spinner.css';

function AzurirajDrzavu() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [drzava, setDrzava] = useState({ naziv: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDrzava = async () => {
            try {
                const response = await DrzavaService.dohvatiDrzavu(id);
                setDrzava(response);
                setLoading(false);
            } catch (error) {
                console.error('Greška prilikom dohvaćanja države:', error);
                setLoading(false);
            }
        };

        fetchDrzava();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDrzava(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DrzavaService.azurirajDrzavu(id, drzava);
            alert('Država je uspješno ažurirana.');
            navigate('/drzave');
        } catch (error) {
            console.error('Greška prilikom ažuriranja države:', error);
        }
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="update-country-form">
            <h1>Ažuriraj državu</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="naziv">Naziv:</label>
                <input
                    type="text"
                    id="naziv"
                    name="naziv"
                    value={drzava.naziv}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Ažuriraj</button>
            </form>
        </div>
    );
}

export default AzurirajDrzavu;
