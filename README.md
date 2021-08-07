# Pre-assignment for Reaktor Fall 2021 (Rulebook)

## Demo

Following demo is automatically built and deployed to Microsoft Azure: [rulebook.northeurope.azurecontainer.io](https://rulebook.northeurope.azurecontainer.io/)

Also running on my personal server: [rulebook.luukuton.fi](https://rulebook.luukuton.fi) as the free Azure credits will run out at some point.

## Documentation

[README](backend) for **Backend**

[README](frontend) for **Frontend**

[docker-compose.example.yml](docker-compose.example.yml) for local setups and [docker-compose.aci.yml](docker-compose.aci.yml) for Azure.

## Local setup

- Get latest Docker.

- Create `docker-compose.yml` to the root of the repository by copying the [docker-compose.example.yml(docker-compose.example.yml).

- Change backend's and frontend's (at least RULEBOOK_DOMAIN) environmentals or volume location in the [docker-compose.yml](docker-compose.yml) if needed.

- Run `docker-compose up --build` in the root dir of the repository.

**About setting up Azure pipeline [here](AZURE.md).**

## Testing

### End to End

- Setup backend (`go build .`) and frontend (`npm run build && npm start` OR `npm run dev`).

- `chmod +x ./backend` probably needed on Linux for the backend. Also, on Windows the binary is called`./backend.exe`.

- Start backend with test data: `.\backend file ../data/rulebook_test_data.txt ../data/` in the backend dir.

- Run `npm run cypress:open` (GUI) or `npm run test:e2e` (CLI) in the frontend dir.

### Unit

**Information about unit testing can be found in backend's [README](backend)**

## Requirements

- Docker 3.4+

## Future improvements

- Authentication for the URL input
- ✅ Fixed ~~Currently Replace functionality requires manual reload of the site. [Fix this when 'on-demand revalidation' is available in Next.js](frontend#something-to-note)~~
