# Pre-assignment for Reaktor Fall 2021 (Rulebook)

## Demo

Following demo is automatically built and deployed to Microsoft Azure: [rulebook.northeurope.azurecontainer.io](https://rulebook.northeurope.azurecontainer.io/)

## Documentation

todo

**[Specifications](docs/specifications.md)**

## Local setup

- Get the latest Docker.

- Run `docker compose up --build` in the root directory of the repository.


## Azure / GitHub Actions setup

Read the short section [Configure GitHub workflow](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-github-action#configure-github-workflow) by Microsoft how to get some of the keys below.

Following environmental variables (_Actions secrets_ in repo settings) are required:

- **AZURE_PUBLIC_URL**: basically the URL for the frontend. Remember http(s) and the port! 
Example: `https://rulebook.northeurope.azurecontainer.io:443`.
- **AZURE_REGION**: the region where the deployment is physically located Example: `northeurope`.

- **REGISTRY_NAME**: 

- **REGISTRY_USERNAME**: The clientId from the JSON output from the service principal creation.

- **REGISTRY_PASSWORD**: The clientSecret from the JSON output from the service principal creation.

- **RESOURCE_GROUP**: The name of the resource group you used to scope the service principal.

- **SHARE_NAME**: The name of the file share in Azure.

- **STORAGE_ACCOUNT_NAME**: The name of the file storage account in Azure.

- **STORAGE_ACCOUNT_KEY**: The password of the file storage account in Azure.

- **CI_AZURE_CREDENTIALS**: The entire JSON output from the service principal creation step.

## Requirements

- Docker 3.4+
- [vishnubob/wait-for-it](https://github.com/vishnubob/wait-for-it) (bundled)

## Something to improve

- ...
