using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.DrzavaDtos;
using api.interfaces;
using api.models;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.repositories
{
    public class DrzavaRepository : IDrzavaRepository
    {

        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;
        public DrzavaRepository(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public DrzavaDto azurirajDrzavu(int id, DrzavaDto drzavaBody)
        {
            var drzava = _context.Drzava.FirstOrDefault(x => x.Id == id);

            if (drzava == null)
            {
                throw new Exception($"Drzava sa ID-em {id} ne postoji.");
            }
            drzava.naziv = drzavaBody.naziv;
            _context.SaveChanges();

            return _mapper.Map<DrzavaDto>(drzava);
        }

        public DrzavaDto dohvatiDrzavuPoIdu(int id)
        {
            var drzava = _context.Drzava.Find(id);
            if (drzava == null)
            {
                throw new Exception($"Drzava sa ID-em {id} ne postoji.");
            }
            var drzavaDto = _mapper.Map<DrzavaDto>(drzava);
            return drzavaDto;
        }

        public List<DrzavaDto> dohvatiSveDrzave()
        {
            var drzave = _context.Drzava.ToList();
            var drzaveDto = _mapper.Map<List<DrzavaDto>>(drzave);
            return drzaveDto;
        }

        public DrzavaDto kreirajNovuDrzavu(DrzavaDto drzavaBody)
        {
            var drzava = new Drzava();
            drzava.naziv = drzavaBody.naziv;

            _context.Drzava.Add(drzava);
            _context.SaveChanges();

            return _mapper.Map<DrzavaDto>(drzava);
        }

        public void obrisiDrzavu(int id)
        {
            var drzava = _context.Drzava.FirstOrDefault(x => x.Id == id);
            if (drzava == null)
            {
                throw new Exception($"Drzava sa ID-em {id} ne postoji.");
            }
            var proizvodaciVezaniUzDrzavu = _context.Proizvodac.Where(p => p.drzavaId == id).ToList();
            if (proizvodaciVezaniUzDrzavu.Any())
            {
                _context.Proizvodac.RemoveRange(proizvodaciVezaniUzDrzavu);
            }

            _context.Remove(drzava);
            _context.SaveChanges();
        }
    }
}