# Playmate

# Setup

## Social app

Create `.env` file in the `src` folder, it should contain following variables:

- `SA_PASSWORD` - password to the database,
- `JWT_KEY` - secret key for the JWT tokens
- `REACT_APP_BASE_API_URL` - base url to the API.

Example file:

```
SA_PASSWORD="Your_password123"
JWT_KEY="super_secret_key"
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

To run the social-frontend application without docker compose create `.env` file in the `src/social-frontend` folder with the `REACT_APP_BASE_API_URL` variable, e.g.:

```
REACT_APP_BASE_API_URL=http://localhost:5000
```
