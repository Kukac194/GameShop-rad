using api.baza;
using api.interfaces;
using api.repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("LokalnaKonekcija"));
});


builder.Services.AddScoped<IDrzavaRepository, DrzavaRepository>();
builder.Services.AddScoped<IigricaRepository, IgricaRepository>();
builder.Services.AddScoped<IProizvodacRepository, ProizvodacRepository>();
builder.Services.AddScoped<IRecenzijaRepository, RecenzijaRepository>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
