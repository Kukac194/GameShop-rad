using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.IgricaDtos;

namespace api.interfaces
{
    public interface IigricaRepository
    {
        IgricaDto dohvatiIgricu(int id);
        List<IgricaDto> dohvatiSveIgrice();

        List<IgricaDto> dohvatiSveIgriceOdProizvodaca(int proizvodacId);
        IgricaDto kreirajNovuIgricu(IgricaDto igricaDto);
        IgricaDto azurirajIgricu(int id, IgricaDto igricaDto);
        void obrisiIgricu(int id);
    }
}