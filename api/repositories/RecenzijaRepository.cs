using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.RecenzijeDtos;
using api.interfaces;
using api.models;
using AutoMapper;

namespace api.repositories
{

    public class RecenzijaRepository : IRecenzijaRepository
    {

        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public RecenzijaRepository(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public RecenzijeDto azurirajRecenziju(int id, RecenzijeDto recenzijeDto)
        {
            var igrica = _context.Igrica.FirstOrDefault(x => x.Id == recenzijeDto.igricaId);

            if (igrica == null)
            {
                throw new Exception($"Igrica sa ID-em {recenzijeDto.igricaId} ne postoji.");
            }

            var recenzija = _context.Recenzija.FirstOrDefault(x => x.Id == id);

            if (recenzija == null)
            {
                throw new Exception($"Recenzija sa ID-em {id} ne postoji.");
            }
            recenzija.recenzija = recenzijeDto.recenzija;
            recenzija.igricaId = recenzijeDto.igricaId;
            _context.SaveChanges();

            return _mapper.Map<RecenzijeDto>(recenzija);
        }

        public List<RecenzijeDto> dohvatiRecenzijeZaIgru(int igricaId)
        {
            var recenzije = _context.Recenzija.Where(x => x.igricaId == igricaId).ToList();
            var recenzijeDto = _mapper.Map<List<RecenzijeDto>>(recenzije);
            return recenzijeDto;
        }

        public RecenzijeDto dohvatiRecenziju(int id)
        {
            var recenzija = _context.Recenzija.Find(id);
            if (recenzija == null)
            {
                throw new Exception($"Recenzija sa ID-em {id} ne postoji.");
            }
            var recenzijaDto = _mapper.Map<RecenzijeDto>(recenzija);
            return recenzijaDto;
        }

        public RecenzijeDto kreirajNovuRecenziju(RecenzijeDto recenzijeDto)
        {
            var igrica = _context.Igrica.FirstOrDefault(x => x.Id == recenzijeDto.igricaId);

            if (igrica == null)
            {
                throw new Exception($"Igrica sa ID-em {recenzijeDto.igricaId} ne postoji.");
            }

            var recenzija = new Recenzija();
            recenzija.recenzija = recenzijeDto.recenzija;
            recenzija.igricaId = recenzijeDto.igricaId;

            _context.Recenzija.Add(recenzija);
            _context.SaveChanges();

            return _mapper.Map<RecenzijeDto>(recenzija);
        }

        public void obrisiRecenziju(int id)
        {
            var recenzija = _context.Recenzija.FirstOrDefault(x => x.Id == id);
            if (recenzija == null)
            {
                throw new Exception($"Recenzija sa ID-em {id} ne postoji.");
            }

            _context.Remove(recenzija);
            _context.SaveChanges();
        }
    }
}