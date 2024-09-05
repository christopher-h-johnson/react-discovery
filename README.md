## React Discovery
[![CircleCI](https://circleci.com/gh/ubleipzig/react-discovery.svg?style=shield)](https://circleci.com/gh/ubleipzig/react-discovery)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5727bf2-2ed5-42f7-a8c1-274871f0c3ea/deploy-status)](https://app.netlify.com/sites/react-discovery/deploys)
[![codecov](https://codecov.io/gh/ubleipzig/react-discovery/branch/solr/graph/badge.svg)](https://codecov.io/gh/ubleipzig/react-discovery)

#### @react-discovery/configuration
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/configuration.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/configuration)

#### @react-discovery/core
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/core.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/core)

#### @react-discovery/components
[![npm (scoped)](https://img.shields.io/npm/v/@react-discovery/components.svg?color=blue)](https://www.npmjs.com/package/@react-discovery/components)

### Quick Start

#### Create Environment
- Configure `search api host`, `apollo server` and `collection` in `.env` file in elasticsearch-app root
- Use the `graphql-iiif` [apollo server](https://github.com/christopher-h-johnson/graphql-iiif)
```yaml
REACT_APP_SEARCH_API_HOST=http://localhost:8000/
REACT_APP_SEARCH_API_COLLECTION=nga
REACT_APP_SEARCH_APOLLO_SERVER=http://localhost:4000
```
##### Setup Test Opensearch Instance
- start docker composition 
    ```bash
    $ cd deployment/opensearch
    $ OPENSEARCH_INITIAL_ADMIN_PASSWORD={$password} docker-compose up
    ```

- create test data set
    ```bash
    $ curl -X PUT "localhost:8000/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @test-data/nga-metadata-bulk-1.txt
    ```
    
### Build and Start React App
 ```bash
 $ npm install
 $ npm build
 $ npm start
```

docker build --build-arg CIRCLE_BRANCH=update-5 --build-arg REACT_APP_SEARCH_API_HOST=https://search-iiif-discovery-qcugn4peovc66qej7i724v4fbq.aos.us-east-1.on.aws/ --build-arg REACT_APP_SEARCH_API_COLLECTION=nga --build-arg REACT_APP_SEARCH_API_USERNAME=christopher-johnson --build-arg REACT_APP_SEARCH_API_PASSWORD=Opensearch1! --build-arg REACT_APP_SEARCH_APOLLO_SERVER=http://localhost:4000/ --no-cache -t christopher-h-johnson/react-discovery:latest .


