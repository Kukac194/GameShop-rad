using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.models
{
    public class Recenzije
    {
        public int Id { get; set; }
        public string? recenzija { get; set; }

        public int? igricaId { get; set; }
        [ForeignKey("igricaId")]
        public Igrica? igrica { get; set; }
    }
}