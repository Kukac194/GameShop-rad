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
    options.UseSqlServer(builder.Configuration.GetConnectionString("EdunovaContext"));
});


builder.Services.AddScoped<IDrzavaRepository, DrzavaRepository>();
builder.Services.AddScoped<IigricaRepository, IgricaRepository>();
builder.Services.AddScoped<IProizvodacRepository, ProizvodacRepository>();
builder.Services.AddScoped<IRecenzijaRepository, RecenzijaRepository>();


var app = builder.Build();

// if (app.Environment.IsDevelopment())
// {
app.UseSwagger(opcije =>
{
    opcije.SerializeAsV2 = true;
});
app.UseSwaggerUI(opcije =>
{
    opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});
// }

app.UseHttpsRedirection();
app.MapControllers();
app.UseStaticFiles();
app.UseCors("CorsPolicy");
app.UseDefaultFiles();
app.UseDeveloperExceptionPage();
app.MapFallbackToFile("index.html");
app.Run();
