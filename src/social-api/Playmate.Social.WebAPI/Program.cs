using Playmate.Social.Application.Common.Extensions;
using Playmate.Social.Infrastructure.Extensions;
using Playmate.Social.WebAPI.Extensions;
using Playmate.Social.WebAPI.Hubs;
using Playmate.Social.WebAPI.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPresentation(builder.Configuration);
builder.Services.AddApplication(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);

var policyName = "social-frontend";
builder.Services.AddCorsConfiguration(builder.Configuration, policyName);
builder.Services.AddSwaggerDoc();
builder.Services.AddControllers();
builder.Services.AddSignalR();

var app = builder.Build();

app.UseCors(policyName);

app.ApplyMigrations();

if (builder.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();

app.UseAuthorization();

app.UseIdentityMiddleware();

app.UseErrorHandlingMiddleware();

app.MapControllers();

app.MapHub<NotificationsHub>(NotificationsHub.HubPath);

app.Run();
