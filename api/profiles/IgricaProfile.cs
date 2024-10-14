using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.IgricaDtos;
using api.models;
using AutoMapper;

namespace api.profiles
{
    public class IgricaProfile : Profile
    {
        public IgricaProfile()
        {
            CreateMap<Igrica, IgricaDto>();
        }
    }
}