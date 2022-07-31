# Playmate

## Setup
To run the social API use the following commands:
```
docker build --rm -t playmate-social/api:latest .
docker run --rm -p 5000:80 -p 5001:443 playmate-social/api
```

Then you can access the API at localhost:5000/swagger.

To stop the running container find its ID using 
```
docker ps
```

and then stop it with:

```
docker stop [ID]
```