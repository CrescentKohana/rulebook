# Pre-assignment for Reaktor Fall 2021 (Rulebook)

## Demo

Following demo is automatically built and deployed to Microsoft Azure: [rulebook.northeurope.azurecontainer.io](https://rulebook.northeurope.azurecontainer.io/)

## Documentation

[README](backend) for **Backend**

[README](frontend) for **Frontend**

[docker-compose.yml](docker-compose.yml) for local setups and [docker-compose.aci.yml](docker-compose.aci.yml) for Azure.

## Local setup

- Get latest Docker.

- Change backend's environmentals or volume location in the [docker-compose.yml](docker-compose.yml) if needed.

- Run `docker-compose up --build` in the root dir of the repository.

**About setting up Azure pipeline [here](AZURE.md).**

## Testing

### End to End

- Setup backend (`go build .`) and frontend (`npm run build && npm start` OR `npm run dev`).

- `chmod +x ./backend` probably needed on Linux for the backend. Also, on Windows the binary is called`./backend.exe`.

- Start backend with test data: `.\backend file ../data/rulebook_test_data.txt ../data/` in the backend dir.

- Run `npm run cypress:open` (GUI) or `npm run test:e2e` (CLI) in the frontend dir.

### Unit

## Requirements

- Docker 3.4+
- [vishnubob/wait-for-it](https://github.com/vishnubob/wait-for-it) (already [bundled](frontend/wait-for-it.sh))

## Future improvements

- Authentication for the URL input
