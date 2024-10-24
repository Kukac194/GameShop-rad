using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.IgricaDtos
{
    public class IgricaDto
    {
        public int Id { get; set; }
        public string? naslov { get; set; }
        public decimal? cijena { get; set; }
        public int? godinaIzdanja { get; set; }

        public string? slika { get; set; }
        public int? ProizvodacId { get; set; }
    }
}