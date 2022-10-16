using Playmate.Social.Application.Common.Extensions;
using Playmate.Social.Infrastructure.Extensions;
using Playmate.Social.WebAPI.Extensions;
using Playmate.Social.WebAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApi();
builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerDoc();
builder.Services.ConfigureCors(builder.Configuration);

var app = builder.Build();

app.UseCors();

app.ApplyMigrations();

app.UseSwagger();

app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseIdentityMiddleware();

app.UseErrorHandlingMiddleware();

app.MapControllers();

app.Run();
