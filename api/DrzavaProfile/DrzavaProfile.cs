using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.dto.DrzavaDtos;
using api.models;
using AutoMapper;

namespace api.DrzavaProfile
{
    public class DrzavaProfile : Profile
    {
        public DrzavaProfile()
        {
            CreateMap<Drzava, DrzavaDto>();
        }
    }
}