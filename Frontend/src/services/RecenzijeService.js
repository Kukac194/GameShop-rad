import axios from 'axios';

const API_BASE_URL = 'https://kukac194-001-site1.jtempurl.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const RecenzijeService = {
  
  dohvatiSveRecenzije: async (igricaId) => {
    try {
      const response = await axiosInstance.get(`/recenzije/igrice/${igricaId}`);
      return response.data;
    } catch (error) {
      console.error('Greška prilikom dohvaćanja recenzija!:', error);
      throw error;
    }
  },


  dodajRecenziju: async (recenzijaData) => {
    try {
      const response = await axiosInstance.post('/recenzije', recenzijaData);
      return response.data;
    } catch (error) {
      console.error('Greška prilikom kreiranja nove recenzije: ', error);
      throw error;
    }
  },

  azurirajRecenziju: async (id, recenzijaData) => {
    try {
      const response = await axiosInstance.put(`/recenzije/${id}`, recenzijaData);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom ažuriranja recenzije sa ID-em ${id}:`, error);
      throw error;
    }
  },

  obrisiRecenziju: async (id) => {
    try {
      const response = await axiosInstance.delete(`/recenzije/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom brisanja recenzije sa ID-em ${id}:`, error);
      throw error;
    }
  },
};

export default RecenzijeService;
