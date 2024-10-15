using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.IgricaDtos;
using api.interfaces;
using api.models;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;

namespace api.repositories
{
    public class IgricaRepository : IigricaRepository
    {

        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public IgricaRepository(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public IgricaDto azurirajIgricu(int id, IgricaDto igricaDto)
        {
            var proizvodac = _context.Proizvodac.FirstOrDefault(x => x.Id == igricaDto.ProizvodacId);

            if (proizvodac == null)
            {
                throw new Exception($"Proizvodac sa ID-em {igricaDto.ProizvodacId} ne postoji.");
            }

            var igrica = _context.Igrica.FirstOrDefault(x => x.Id == id);

            if (igrica == null)
            {
                throw new Exception($"Igrica sa ID-em {id} ne postoji.");
            }
            igrica.naslov = igricaDto.naslov;
            igrica.cijena = igricaDto.cijena;
            igrica.godinaIzdanja = igricaDto.godinaIzdanja;
            igrica.ProizvodacId = igricaDto.ProizvodacId;
            _context.SaveChanges();

            return _mapper.Map<IgricaDto>(igrica);
        }

        public IgricaDto dohvatiIgricu(int id)
        {
            var igrica = _context.Igrica.Find(id);
            if (igrica == null)
            {
                throw new Exception($"Igrica sa ID-em {id} ne postoji.");
            }
            var igricaDto = _mapper.Map<IgricaDto>(igrica);
            return igricaDto;
        }

        public List<IgricaDto> dohvatiSveIgrice()
        {
            var igrice = _context.Igrica.ToList();
            var igriceDto = _mapper.Map<List<IgricaDto>>(igrice);
            return igriceDto;
        }

        public List<IgricaDto> dohvatiSveIgriceOdProizvodaca(int proizvodacId)
        {
            var igrice = _context.Igrica.Where(x => x.ProizvodacId == proizvodacId).ToList();
            var igriceDto = _mapper.Map<List<IgricaDto>>(igrice);
            return igriceDto;
        }

        public IgricaDto kreirajNovuIgricu(IgricaDto igricaDto)
        {

            var proizvodac = _context.Proizvodac.FirstOrDefault(x => x.Id == igricaDto.ProizvodacId);

            if (proizvodac == null)
            {
                throw new Exception($"Proizvodac sa ID-em {igricaDto.ProizvodacId} ne postoji.");
            }

            var igrica = new Igrica();
            igrica.naslov = igricaDto.naslov;
            igrica.cijena = igricaDto.cijena;
            igrica.godinaIzdanja = igricaDto.godinaIzdanja;
            igrica.ProizvodacId = igricaDto.ProizvodacId;

            _context.Igrica.Add(igrica);
            _context.SaveChanges();

            return _mapper.Map<IgricaDto>(igrica);
        }

        public void obrisiIgricu(int id)
        {
            var igrica = _context.Igrica.FirstOrDefault(x => x.Id == id);
            if (igrica == null)
            {
                throw new Exception($"Igrica sa ID-em {id} ne postoji.");
            }
            var recenzijeVezaneUzIgricu = _context.Recenzija.Where(r => r.igricaId == id).ToList();
            if (recenzijeVezaneUzIgricu.Any())
            {
                _context.Recenzija.RemoveRange(recenzijeVezaneUzIgricu);
            }

            _context.Remove(igrica);
            _context.SaveChanges();
        }
    }
}