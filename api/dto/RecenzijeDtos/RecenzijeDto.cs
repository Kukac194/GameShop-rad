using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.RecenzijeDtos
{
    public class RecenzijeDto
    {
        public int Id { get; set; }
        public string? recenzija { get; set; }

        public int? igricaId { get; set; }
    }
}