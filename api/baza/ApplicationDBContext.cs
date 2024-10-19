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
        public DbSet<Recenzija> Recenzija { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            /*Proizvodac*/

            modelBuilder.Entity<Proizvodac>()
                .HasIndex(i => i.ime)
                .IsUnique();
            modelBuilder.Entity<Proizvodac>()
                .HasMany(p => p.igre)
                .WithOne(i => i.Proizvodac)
                .OnDelete(DeleteBehavior.Cascade);

            /*Igrica*/
            modelBuilder.Entity<Igrica>()
                .HasIndex(i => i.naslov)
                .IsUnique();
            modelBuilder.Entity<Igrica>()
                .HasMany(i => i.recenzije)
                .WithOne(r => r.igrica)
                .OnDelete(DeleteBehavior.Cascade);

            /*Drzava*/
            modelBuilder.Entity<Drzava>()
                .HasIndex(i => i.naziv)
                .IsUnique();
            modelBuilder.Entity<Drzava>()
                .HasMany(p => p.proizvodaci)
                .WithOne(d => d.drzava)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}