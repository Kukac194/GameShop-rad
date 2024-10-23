import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProizvodacService from '../../services/ProizvodacService';
import DrzavaService from '../../services/DrzavaService';
import './AzurirajProizvodaca.css';
import '../Utils/spinner.css';

function AzurirajProizvodaca() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proizvodac, setProizvodac] = useState({ ime: '', drzavaId: '' });
    const [drzave, setDrzave] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProizvodac = async () => {
            try {
                const response = await ProizvodacService.dohvatiProizvodacaPoIdu(id);
                setProizvodac(response);
                setLoading(false);
            } catch (error) {
                console.error('Greška prilikom dohvaćanja proizvođača:', error);
                setLoading(false);
            }
        };

        const fetchDrzave = async () => {
            try {
                const response = await DrzavaService.dohvatiSveDrzave();
                setDrzave(response);
            } catch (error) {
                console.error('Greška prilikom dohvaćanja država:', error);
            }
        };

        fetchProizvodac();
        fetchDrzave();
    }, [id]);

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
            await ProizvodacService.azurirajProizvodaca(id, proizvodac);
            alert('Proizvođač je uspješno ažuriran.');
            navigate('/proizvodaci');
        } catch (error) {
            console.error('Greška prilikom ažuriranja proizvođača:', error);
        }
    };

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="update-manufacturer-form">
        <h1>Ažuriraj proizvođača</h1>
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
    
            <button type="submit">Ažuriraj</button>
        </form>
    </div>
    

    );
}

export default AzurirajProizvodaca;
