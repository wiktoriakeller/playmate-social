var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("cors-policy", builder => builder.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("cors-policy");
app.UseSwagger();

app.UseSwaggerUI();

//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
