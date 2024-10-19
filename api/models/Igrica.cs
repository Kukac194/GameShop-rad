using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Igrica
    {
        public int Id { get; set; }
        public string? naslov { get; set; }

        public decimal? cijena { get; set; }
        public int? godinaIzdanja { get; set; }

        public int? ProizvodacId { get; set; }

        [ForeignKey("ProizvodacId")]
        public Proizvodac? Proizvodac { get; set; }

        public ICollection<Recenzija>? recenzije { get; set; } = new List<Recenzija>();

    }
}