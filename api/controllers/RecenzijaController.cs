using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.baza;
using api.dto.RecenzijeDtos;
using api.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace api.controllers
{

    [Route("api/recenzije")]
    [ApiController]
    public class RecenzijaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IRecenzijaRepository _recenzijaRepo;
        public RecenzijaController(ApplicationDBContext context, IRecenzijaRepository iRecenzijaRepo)
        {
            _context = context;
            _recenzijaRepo = iRecenzijaRepo;
        }

        [HttpGet("igrice/{id}")]
        public IActionResult dohvatiRecenzijeZaIgru([FromRoute] int id)
        {
            return Ok(_recenzijaRepo.dohvatiRecenzijeZaIgru(id));
        }

        [HttpGet("{id}")]
        public IActionResult dohvatiRecenziju([FromRoute] int id)
        {
            return Ok(_recenzijaRepo.dohvatiRecenziju(id));
        }

        [HttpPost]
        public IActionResult kreirajNovuRecenziju([FromBody] RecenzijeDto recenzijeDto)
        {
            var novaRecenzija = _recenzijaRepo.kreirajNovuRecenziju(recenzijeDto);
            return CreatedAtAction(nameof(dohvatiRecenziju), new { id = novaRecenzija.Id }, novaRecenzija);
        }

        [HttpPut("{id}")]

        public IActionResult azurirajRecenziju([FromRoute] int id, [FromBody] RecenzijeDto recenzijeDto)
        {
            return Ok(_recenzijaRepo.azurirajRecenziju(id, recenzijeDto));
        }

        [HttpDelete("{id}")]
        public IActionResult obrisiRecenziju([FromRoute] int id)
        {
            _recenzijaRepo.obrisiRecenziju(id);
            return NoContent();
        }
    }
}