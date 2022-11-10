swagger
http://127.0.0.1:8000/docs

api
http://127.0.0.1:8000/battleships

http://localhost:8000/battleships/test2

# BATTLESHIPS BACKEND

```
battleships/backend$ py -m venv ./venv
```

```
battleships/backend$ .\venv\Scripts\Activate.ps1
```

```
battleships/backend$ py -m pip install -r requirements.txt
```

```
battleships/backend$ uvicorn src.main:app --reload
```

```
battleships/backend$ pip freeze > requirements.txt
```

# BATTLESHIPS GAME-APP

```
battleships\game-app> npm i
```

```
battleships\game-app> npm run start
```
