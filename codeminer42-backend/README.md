# codeminer42-backend

## Project Setup

### Node install
```sh
nvm install v18.17.0
npm install
```

### Database provisioning
Network
```sh
docker network create local
```

Creation
```sh
docker run --name codeminer42-backend -p 5432:5432 --network local -e POSTGRES_DB=codeminer42 -e POSTGRES_USER=codeminer42 -e POSTGRES_PASSWORD=mysecretpassword -d postgres:12.15
```

Baseline migrations (run from project's base path)
```sh
docker run --rm --network local -v ${PWD}/flyway/conf:/flyway/conf -v ${PWD}/flyway/sql:/flyway/sql flyway/flyway:9.21.0 migrate
```

Reset database (optional)
```sh
docker run --rm --network local -v ${PWD}/flyway/conf:/flyway/conf -v ${PWD}/flyway/sql:/flyway/sql flyway/flyway:9.21.0 clean migrate
```

### Execution

Config .env
```sh
cp .env.default .env
```

Run app
```sh
npm run dev
```

-> Refer to postman folder for api test

1. List pilots
2. Save pilot
3. Get pilot
4. Save ship
5. Pilot ships
6. Save cargos
7. List contracts
8. Save contract
9. Execute contract
10. List routes
