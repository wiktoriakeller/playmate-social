# Playmate

Link to the [backlog](https://github.com/users/codeblessing/projects/4).

# Technologies

## Social app

Backend:

- C#
- .NET 7
- ASP.NET Core
- SignalR
- Entity Framework Core
- MSSQL
- Cassandra
- FluentValidation
- AutoMapper
- MediatR

Frontend:

- TypeScript
- React
- Redux
- RTK Query
- MUI
- Emotion

## Battleships

Backend:

- Python 3.10
- FastAPI
- WebSocket

Frontend:

- TypeScript
- React
- Redux

# Setup

## Social app

Setup of social application with and without Compose.

### With Docker Compose

Create `.env` file in the `src` folder, it should contain the following variables:

- `SA_PASSWORD` - password to the database,
- `JWT_KEY` - secret key for the JWT tokens
- `REACT_APP_BASE_API_URL` - base url to the API.

Example file:

```
SA_PASSWORD=Your_password123
JWT_KEY=super_secret_key
REACT_APP_BASE_API_URL=http://localhost:5000
```

Then in the `src` folder run:

```
docker compose up
```

To delete created containers run:

```
docker compose down
```

To force rebuild of the containers run:

```
docker compose up --build
```

### Without Docker Compose

To run the social-frontend application without docker compose create `.env` file in the `src/social-frontend` folder with the `REACT_APP_BASE_API_URL` variable, e.g.:

```
REACT_APP_BASE_API_URL=http://localhost:5000
```

Next start Cassandra Docker container:

```
docker run --name cassandra-test -p 9044:9042 -d cassandra:latest
```

## Battleships

Create `.env` file in the `src/games/battleships` folder, it should contain the following variables:

- `REACT_APP_BASE_API_URL` - internal url
- `REACT_APP_PUBLIC_URL` - base url to game client.

Example file:

```
REACT_APP_BASE_API_URL=http://localhost:3000
REACT_APP_PUBLIC_URL=http://localhost:4000
```

Then in the `src/games/battleships` folder run:

```
docker compose up
```

To delete created containers run:

```
docker compose down
```

To force rebuild of the containers run:

```
docker compose up --build
```
