# 🎮 Playmate

Bachelor's degree final project - social platform that allows its users to play games with each other and gather statistics from gameplays.

Project backlog can be accessed [here](https://github.com/users/codeblessing/projects/4).

## Social API Technologies

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

## Social UI Technologies

- TypeScript
- React
- Redux
- RTK Query
- MUI
- Emotion

## Setup

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
