import axios from 'axios';

const API_BASE_URL = 'http://kukac194-001-site1.jtempurl.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const GameService = {
  
  dohvatiSveIgrice: async () => {
    try {
      const response = await axiosInstance.get('/igrice');
      return response.data;
    } catch (error) {
      console.error('Greška prilikom dohvaćanja igrica!:', error);
      throw error;
    }
  },

  dohvatiSveIgriceProizvodaca: async (proizvodacId) => {
    try {
      const response = await axiosInstance.get(`/igrice/proizvodac/${proizvodacId}`);
      return response.data;
    }
    catch(error) {
      console.error("Greška prilikom dohvaćanja igrica!")
    }
  },

  dohvatiIgricuPoIdu: async (id) => {
    try {
      const response = await axiosInstance.get(`/igrice/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom dohvaćanja igrice sa ID-em ${id}:`, error);
      throw error;
    }
  },

  dodajIgricu: async (gameData) => {
    try {
      const response = await axiosInstance.post('/igrice', gameData);
      return response.data;
    } catch (error) {
      console.error('Greška prilikom kreiranja nove igrice: ', error);
      throw error;
    }
  },

  azurirajIgricu: async (id, gameData) => {
    try {
      const response = await axiosInstance.put(`/igrice/${id}`, gameData);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom ažuriranja igrice sa ID-em ${id}:`, error);
      throw error;
    }
  },

  obrisiIgricu: async (id) => {
    try {
      const response = await axiosInstance.delete(`/igrice/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom brisanja igrice sa ID-em ${id}:`, error);
      throw error;
    }
  },
};

export default GameService;
