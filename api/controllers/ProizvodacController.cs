using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.ProizvodacDtos;
using api.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{
    [Route("/api/proizvodaci")]
    [ApiController]
    public class ProizvodacController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IProizvodacRepository _proizvodacRepo;
        public ProizvodacController(ApplicationDBContext context, IProizvodacRepository iProizvodacRepository)
        {
            _context = context;
            _proizvodacRepo = iProizvodacRepository;
        }

        [HttpGet]
        public IActionResult dohvatiSveProizvodace()
        {
            return Ok(_proizvodacRepo.dohvatiSveProizvodace());
        }

        [HttpGet("{id}")]
        public IActionResult dohvatiProizvodacaPoIdu([FromRoute] int id)
        {
            return Ok(_proizvodacRepo.dohvatiProizvodaca(id));
        }

        [HttpGet("drzave/{id}")]
        public IActionResult dohvatiSveProizvodaceIzNekeDrzave([FromRoute] int id)
        {
            return Ok(_proizvodacRepo.dohvatiSveProizvodaceIzNekeDrzave(id));
        }

        [HttpPost]
        public IActionResult kreirajNovogProizvodaca([FromBody] ProizvodacDto proizvodacDto)
        {
            var noviProizvodac = _proizvodacRepo.kreirajNovogProizvodaca(proizvodacDto);
            return CreatedAtAction(nameof(dohvatiProizvodacaPoIdu), new { id = noviProizvodac.Id }, noviProizvodac);
        }

        [HttpPut("{id}")]

        public IActionResult azurirajProizvodaca([FromRoute] int id, [FromBody] ProizvodacDto proizvodacDto)
        {
            return Ok(_proizvodacRepo.azurirajProizvodaca(id, proizvodacDto));
        }

        [HttpDelete("{id}")]
        public IActionResult obrisiProizvodaca([FromRoute] int id)
        {
            _proizvodacRepo.obrisiProizvodaca(id);
            return NoContent();
        }
    }
}