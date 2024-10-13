using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using Microsoft.EntityFrameworkCore;

namespace api.baza
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Igrica> Igrica { get; set; }
        public DbSet<Drzava> Drzava { get; set; }
        public DbSet<Proizvodac> Proizvodac { get; set; }
        public DbSet<Recenzije> Recenzije { get; set; }
    }
}