using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.RecenzijeDtos;
using api.models;
using AutoMapper;

namespace api.profiles
{
    public class RecenzijaProfile : Profile
    {
        public RecenzijaProfile()
        {
            CreateMap<Recenzija, RecenzijeDto>();
        }
    }
}