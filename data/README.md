# Data

- ./scripts/ include the different scripts for fetching data from the Github API. These need to be run individually for now.
- ./mongoLoader.js inserts the fetched data into MongoDB, need to be modified before running with correct paths.

## Create mongodb docker instance with:

docker run -d -p 27017:27017 --name githubdata mongo:latest
