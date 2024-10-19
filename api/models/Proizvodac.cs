using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Proizvodac
    {
        public int Id { get; set; }
        public string? ime { get; set; }

        public int? drzavaId { get; set; }

        [ForeignKey("drzavaId")]
        public Drzava? drzava { get; set; }

        public ICollection<Igrica> igre { get; set; } = new List<Igrica>();
    }
}