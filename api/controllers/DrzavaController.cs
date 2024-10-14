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
using Microsoft.AspNetCore.Mvc;


namespace api.controllers
{
    [Route("api/drzave")]
    [ApiController]
    public class DrzavaController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IDrzavaRepository _drzavaRepo;
        public DrzavaController(ApplicationDBContext context, IDrzavaRepository drzavaRepository)
        {
            _context = context;
            _drzavaRepo = drzavaRepository;
        }



        [HttpGet]
        public IActionResult dohvatiSveDrzave()
        {
            return Ok(_drzavaRepo.dohvatiSveDrzave());
        }


        [HttpGet("{id}")]
        public IActionResult dohvatiDrzavuPoIdu([FromRoute] int id)
        {
            return Ok(_drzavaRepo.dohvatiDrzavuPoIdu(id));
        }

        [HttpPost]
        public IActionResult kreirajNovuDrzavu([FromBody] DrzavaDto drzavaBody)
        {
            var createdDrzava = _drzavaRepo.kreirajNovuDrzavu(drzavaBody);
            return CreatedAtAction(nameof(dohvatiDrzavuPoIdu), new { id = createdDrzava.Id }, createdDrzava);
        }

        [HttpPut("{id}")]

        public IActionResult azurirajDrzavu([FromRoute] int id, [FromBody] DrzavaDto drzavaBody)
        {
            return Ok(_drzavaRepo.azurirajDrzavu(id, drzavaBody));
        }


        [HttpDelete("{id}")]
        public IActionResult obrisiDrzavu([FromRoute] int id)
        {
            _drzavaRepo.obrisiDrzavu(id);
            return NoContent();
        }

    }
}