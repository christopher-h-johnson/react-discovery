## React Discovery
[![CircleCI](https://circleci.com/gh/ubleipzig/react-discovery.svg?style=shield)](https://circleci.com/gh/ubleipzig/react-discovery)
[![Netlify Status](https://api.netlify.com/api/v1/badges/c5727bf2-2ed5-42f7-a8c1-274871f0c3ea/deploy-status)](https://app.netlify.com/sites/react-discovery/deploys)
[![codecov](https://codecov.io/gh/ubleipzig/react-discovery/branch/solr/graph/badge.svg)](https://codecov.io/gh/ubleipzig/react-discovery)

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

### DEMO SITE
http://ec2-3-88-32-73.compute-1.amazonaws.com/

