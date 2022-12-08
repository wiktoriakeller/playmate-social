using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Playmate.Social.Infrastructure.Persistence.Interfaces;

namespace Playmate.Social.Infrastructure.Common.Extensions;

public static class ConnectCassandraExtension
{
    public static async Task ConnectCassandra(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var services = scope.ServiceProvider;
        var connection = services.GetRequiredService<ICassandraConnection>();
        await connection.Connect();
    }
}
