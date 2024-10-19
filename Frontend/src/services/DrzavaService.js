import axios from 'axios';
import constants from '../assets/constants.js';

const API_BASE_URL = constants.API_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const CountryService = {
  
  dohvatiSveDrzave: async () => {
    try {
      const response = await axiosInstance.get('/drzave');
      return response.data;
    } catch (error) {
      console.error('Greška prilikom dohvaćanja država!:', error);
      throw error;
    }
  },

  dohvatiDrzavu: async (drzavaId) => {
    try {
      const response = await axiosInstance.get(`/drzave/${drzavaId}`);
      return response.data;
    }
    catch(error) {
      console.error("Greška prilikom dohvaćanja države!")
    }
  },


  dodajDrzavu: async (countryData) => {
    try {
      const response = await axiosInstance.post('/drzave', countryData);
      return response.data;
    } catch (error) {
      console.error('Greška prilikom kreiranja nove države: ', error);
      throw error;
    }
  },

  azurirajDrzavu: async (id, countryData) => {
    try {
      const response = await axiosInstance.put(`/drzave/${id}`, countryData);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom ažuriranja države sa ID-em ${id}:`, error);
      throw error;
    }
  },

  obrisiDrzavu: async (id) => {
    try {
      const response = await axiosInstance.delete(`/drzave/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom brisanja države sa ID-em ${id}:`, error);
      throw error;
    }
  },
};

export default CountryService;
