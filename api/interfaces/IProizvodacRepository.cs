using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.ProizvodacDtos;

namespace api.interfaces
{
    public interface IProizvodacRepository
    {
        ProizvodacDto dohvatiProizvodaca(int id);
        List<ProizvodacDto> dohvatiSveProizvodace();

        ProizvodacDto kreirajNovogProizvodaca(ProizvodacDto proizvodacDto);
        ProizvodacDto azurirajProizvodaca(int id, ProizvodacDto proizvodacDto);

        List<ProizvodacDto> dohvatiSveProizvodaceIzNekeDrzave(int drzavaId);
        void obrisiProizvodaca(int id);
    }
}