using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.dto.ProizvodacDtos
{
    public class ProizvodacDto
    {
        public int Id { get; set; }
        public string? ime { get; set; }

        public int? drzavaId { get; set; }
    }
}