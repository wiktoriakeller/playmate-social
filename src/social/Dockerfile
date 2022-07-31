FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Copy .csproj files and restore project dependencies
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /src
COPY *.sln .
COPY Playmate.Social.Domain/*.csproj ./Playmate.Social.Domain/
COPY Playmate.Social.Application/*.csproj ./Playmate.Social.Application/
COPY Playmate.Social.Infrastructure/*.csproj ./Playmate.Social.Infrastructure/
COPY Playmate.Social.WebAPI/*.csproj ./Playmate.Social.WebAPI/
RUN dotnet restore "./Playmate.Social.WebAPI/Playmate.Social.WebAPI.csproj"

# Copy everything else to our current working directory and publish
COPY . .
RUN dotnet publish "./Playmate.Social.WebAPI/Playmate.Social.WebAPI.csproj" -c Release -o /app/publish --no-restore

FROM base AS final
WORKDIR /app
COPY --from=build-env /app/publish .
ENTRYPOINT ["dotnet", "Playmate.Social.WebAPI.dll"]
