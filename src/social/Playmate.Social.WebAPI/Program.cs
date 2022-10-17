using Playmate.Social.Application.Common.Extensions;
using Playmate.Social.Infrastructure.Extensions;
using Playmate.Social.WebAPI.Extensions;
using Playmate.Social.WebAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPresentation(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddControllers();

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
