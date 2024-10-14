using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.RecenzijeDtos;

namespace api.interfaces
{
    public interface IRecenzijaRepository
    {
        RecenzijeDto dohvatiRecenziju(int id);
        List<RecenzijeDto> dohvatiRecenzijeZaIgru(int igricaId);

        RecenzijeDto kreirajNovuRecenziju(RecenzijeDto recenzijeDto);
        RecenzijeDto azurirajRecenziju(int id, RecenzijeDto recenzijeDto);

        void obrisiRecenziju(int id);
    }
}