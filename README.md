# 🎮 Playmate
[![.github/workflows/CI.yml](https://github.com/wiktoriakeller/playmate-social/actions/workflows/CI.yml/badge.svg?branch=develop)](https://github.com/wiktoriakeller/playmate-social/actions/workflows/CI.yml)
[![CD](https://github.com/wiktoriakeller/playmate-social/actions/workflows/CD.yml/badge.svg?branch=main)](https://github.com/wiktoriakeller/playmate-social/actions/workflows/CD.yml)

Bachelor's degree final project - social platform that allows its users to play games with each other and gather statistics from gameplays.
Users can exchange messages with each other in real time, upload profile pictures, send invitations, play games with each other and view statistics. Web application supports external Google accounts and is accessible from both desktop and mobile devices. Social Platform API implements the Onion architecture and CQRS pattern. User's and games images are stored using Azure Blob Storage service. Real time functionalities of the application were implemented using SignalR. Chat messages are stored in the Apache Cassandra database.

Project backlog can be accessed [here](https://github.com/users/wiktoriakeller/projects/3).

## Deployments

- [Social App](https://test-playmate.pages.dev/)
- [Social API](https://playmate-social-api.azurewebsites.net/)

## Social API Technologies

- C#
- .NET 7
- ASP.NET Core
- SignalR
- Entity Framework Core
- MSSQL
- Apache Cassandra
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

## Cloud

- Azure Cosmos DB
- Blob storage
- Azure SQL Database
- Azure App Service
- Cloudflare

## Setup

Setup of social application with and without Compose.

### With Docker Compose

Create `.env` file in the `src` folder, it should contain the following variables:

- `SA_PASSWORD` - password to the database,
- `JWT_KEY` - secret key for the JWT tokens,
- `REACT_APP_BASE_API_URL` - base url to the API,
- `GOOGLE_CLIENT_ID` - client id for Google OAuth,
- `GOOGLE_CLIENT_SECRET` - client secret for Google OAuth.

Example file:

```
SA_PASSWORD=Your_password123
JWT_KEY=super_secret_key
REACT_APP_BASE_API_URL=http://localhost:5000
GOOGLE_CLIENT_ID=123456789
GOOGLE_CLIENT_SECRET=123456789
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

You can access the API at: `localhost:5000/swagger` and the website application at: `localhost:4000`.

### Without Docker Compose

To run the social-frontend application without docker compose create `.env` file in the `src/social-frontend` folder with the `REACT_APP_BASE_API_URL` and `REACT_APP_GOOGLE_CLIENT_ID` variables, e.g.:

```
REACT_APP_BASE_API_URL=http://localhost:5000
REACT_APP_GOOGLE_CLIENT_ID=123456789
```

Next start Cassandra Docker container:

```
docker run --name cassandra-test -p 9044:9042 -d cassandra:latest
```

## Screenshots

<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/signin.png" width="800"/> 
<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/registration.png" width="800"/> 
<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/chat.png" width="800"/> 
<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/games.png" width="800"/> 
<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/statistics.png" width="800"/> 

<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/dark-chat-mobile.jpg" width="300"/> <img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/games-mobile.jpg" width="300"/> 

<img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/mobile-profile.jpg" width="300"/> <img src="https://github.com/wiktoriakeller/playmate-social/blob/develop/screenshots/friends.jpg" width="300"/> 

