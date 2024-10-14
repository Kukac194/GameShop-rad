using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.ProizvodacDtos;
using api.interfaces;
using api.models;
using AutoMapper;

namespace api.repositories
{
    public class ProizvodacRepository : IProizvodacRepository
    {

        private readonly ApplicationDBContext _context;
        private readonly IMapper _mapper;

        public ProizvodacRepository(ApplicationDBContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public ProizvodacDto azurirajProizvodaca(int id, ProizvodacDto proizvodacDto)
        {

            // Provjera jel država postoji
            var drzava = _context.Drzava.FirstOrDefault(x => x.Id == proizvodacDto.drzavaId);
            if (drzava == null)
            {
                throw new Exception($"Država sa ID-em {proizvodacDto.drzavaId} ne postoji.");
            }

            var proizvodac = _context.Proizvodac.FirstOrDefault(x => x.Id == id);

            if (proizvodac == null)
            {
                throw new Exception($"Proizvodac sa ID-em {id} ne postoji.");
            }
            proizvodac.ime = proizvodacDto.ime;
            proizvodac.drzavaId = proizvodacDto.drzavaId;
            _context.SaveChanges();

            return _mapper.Map<ProizvodacDto>(proizvodac);
        }

        public ProizvodacDto dohvatiProizvodaca(int id)
        {
            var proizvodac = _context.Proizvodac.Find(id);
            if (proizvodac == null)
            {
                throw new Exception($"Proizvodac sa ID-em {id} ne postoji.");
            }
            var proizvodacDto = _mapper.Map<ProizvodacDto>(proizvodac);
            return proizvodacDto;
        }

        public List<ProizvodacDto> dohvatiSveProizvodace()
        {
            var proizvodaci = _context.Proizvodac.ToList();
            var proizvodaciDto = _mapper.Map<List<ProizvodacDto>>(proizvodaci);
            return proizvodaciDto;
        }

        public List<ProizvodacDto> dohvatiSveProizvodaceIzNekeDrzave(int drzavaId)
        {
            var proizvodaci = _context.Proizvodac.Where(x => x.drzavaId == drzavaId).ToList();
            return _mapper.Map<List<ProizvodacDto>>(proizvodaci);
        }

        public ProizvodacDto kreirajNovogProizvodaca(ProizvodacDto proizvodacDto)
        {
            // Provjera jel država postoji
            var drzava = _context.Drzava.FirstOrDefault(x => x.Id == proizvodacDto.drzavaId);
            if (drzava == null)
            {
                throw new Exception($"Država sa ID-em {proizvodacDto.drzavaId} ne postoji.");
            }
            var proizvodac = new Proizvodac();
            proizvodac.ime = proizvodacDto.ime;
            proizvodac.drzavaId = proizvodacDto.drzavaId;

            _context.Proizvodac.Add(proizvodac);
            _context.SaveChanges();

            return _mapper.Map<ProizvodacDto>(proizvodac);
        }

        public void obrisiProizvodaca(int id)
        {
            var proizvodac = _context.Proizvodac.FirstOrDefault(x => x.Id == id);
            if (proizvodac == null)
            {
                throw new Exception($"Proizvodac sa ID-em {id} ne postoji.");
            }
            var igriceVezaneUzProizvodaca = _context.Igrica.Where(i => i.ProizvodacId == id).ToList();
            if (igriceVezaneUzProizvodaca.Any())
            {
                _context.Igrica.RemoveRange(igriceVezaneUzProizvodaca);
            }

            _context.Remove(proizvodac);
            _context.SaveChanges();
        }
    }
}