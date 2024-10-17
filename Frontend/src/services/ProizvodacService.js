import axios from 'axios';

const API_BASE_URL = 'https://kukac194-001-site1.jtempurl.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ProizvodacService = {
  
  dohvatiSveProizvodace: async () => {
    try {
      const response = await axiosInstance.get('/proizvodaci');
      return response.data;
    } catch (error) {
      console.error('Greška prilikom dohvaćanja proizvođača!:', error);
      throw error;
    }
  },

  dohvatiProizvodacaPoIdu: async (id) => {
    try {
      const response = await axiosInstance.get(`/proizvodaci/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom dohvaćanja proizvođača sa ID-em ${id}:`, error);
      throw error;
    }
  },

  dodajProizvodaca: async (proizvodaciData) => {
    try {
      const response = await axiosInstance.post('/proizvodaci', proizvodaciData);
      return response.data;
    } catch (error) {
      console.error('Greška prilikom kreiranja novog proizvođača: ', error);
      throw error;
    }
  },

  azurirajProizvodaca: async (id, proizvodacData) => {
    try {
      const response = await axiosInstance.put(`/proizvodaci/${id}`, proizvodacData);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom ažuriranja proizvođača sa ID-em ${id}:`, error);
      throw error;
    }
  },

  dohvatiProizvodaceIzDrzave: async (drzavaId) => {
    try {
      const response = await axiosInstance.get(`/proizvodaci/drzave/${drzavaId}`);
      return response.data;
    }
    catch(error) {
      console.error(`Greška prilikom dohvaćanja proizvođača sa ID-em države${drzavaId}:`, error);
      throw error;
    }
  },

  obrisiProizvodaca: async (id) => {
    try {
      const response = await axiosInstance.delete(`/proizvodaci/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Greška prilikom brisanja proizvođača sa ID-em ${id}:`, error);
      throw error;
    }
  },
};

export default ProizvodacService;
