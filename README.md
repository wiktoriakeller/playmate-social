# Playmate

## Setup
To run the application use the following commands:
```
docker build --rm -t playmate-social/api:latest .
docker run --rm -p 5000:80 -p 5001:443 playmate-social/api
```