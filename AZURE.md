# Azure / GitHub Actions setup

**[docker-compose.aci.yml](docker-compose.aci.yml) is for Azure**.

Read the short section [Configure GitHub workflow](https://docs.microsoft.com/en-us/azure/container-instances/container-instances-github-action#configure-github-workflow) by Microsoft how to get some of the keys below.

Following environmental variables (_Actions secrets_ in repo settings) are required:

- **AZURE_PUBLIC_URL**: basically the URL for the frontend. Remember http(s) and the port!
  Example: `https://rulebook.northeurope.azurecontainer.io:443`.
- **AZURE_REGION**: the region where the deployment is physically located Example: `northeurope`.

- **REGISTRY_NAME**: name of the Azure registry (**this-one-here**.azurecr.io).

- **REGISTRY_USERNAME**: The clientId from the JSON output from the service principal creation.

- **REGISTRY_PASSWORD**: The clientSecret from the JSON output from the service principal creation.

- **RESOURCE_GROUP**: The name of the resource group you used to scope the service principal.

- **SHARE_NAME**: The name of the file share in Azure.

- **STORAGE_ACCOUNT_NAME**: The name of the file storage account in Azure.

- **STORAGE_ACCOUNT_KEY**: The password of the file storage account in Azure.

- **CI_AZURE_CREDENTIALS**: The entire JSON output from the service principal creation step.

- **REPO_GHA_PAT**: Person Access Token with repo scope for automatic deployment after build step.
