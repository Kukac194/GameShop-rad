using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.DrzavaDtos;
using api.models;

namespace api.interfaces
{
    public interface IDrzavaRepository
    {
        DrzavaDto kreirajNovuDrzavu(DrzavaDto drzavaBody);
        List<DrzavaDto> dohvatiSveDrzave();
        DrzavaDto dohvatiDrzavuPoIdu(int id);
        DrzavaDto azurirajDrzavu(int id, DrzavaDto drzavaBody);
        void obrisiDrzavu(int id);

    }
}