using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.ProizvodacDtos;
using api.models;
using AutoMapper;

namespace api.profiles
{
    public class ProizvodacProfile : Profile
    {
        public ProizvodacProfile()
        {
            CreateMap<Proizvodac, ProizvodacDto>();
        }
    }
}