using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.IgricaDtos;
using api.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{
    [Route("/api/igrice")]
    [ApiController]
    public class IgricaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IigricaRepository _igricaRepo;
        public IgricaController(ApplicationDBContext context, IigricaRepository iigricaRepository)
        {
            _context = context;
            _igricaRepo = iigricaRepository;
        }

        [HttpGet]
        public IActionResult dohvatiSveIgrice()
        {
            return Ok(_igricaRepo.dohvatiSveIgrice());
        }

        [HttpGet("{id}")]
        public IActionResult dohvatiIgricuPoIdu([FromRoute] int id)
        {
            return Ok(_igricaRepo.dohvatiIgricu(id));
        }

        [HttpGet("proizvodac/{id}")]
        public IActionResult dohvatiIgricePoProizvodacu([FromRoute] int id)
        {
            return Ok(_igricaRepo.dohvatiSveIgriceOdProizvodaca(id));
        }

        [HttpPost]
        public IActionResult kreirajNovuIgricu([FromBody] IgricaDto igricaDto)
        {
            var novaIgrica = _igricaRepo.kreirajNovuIgricu(igricaDto);
            return CreatedAtAction(nameof(dohvatiIgricuPoIdu), new { id = novaIgrica.Id }, novaIgrica);
        }

        [HttpPut("{id}")]

        public IActionResult azurirajIgricu([FromRoute] int id, [FromBody] IgricaDto igricaDto)
        {
            return Ok(_igricaRepo.azurirajIgricu(id, igricaDto));
        }

        [HttpDelete("{id}")]
        public IActionResult obrisiIgricu([FromRoute] int id)
        {
            _igricaRepo.obrisiIgricu(id);
            return NoContent();
        }
    }
}