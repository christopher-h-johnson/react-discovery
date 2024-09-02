FROM node:latest

LABEL maintainer="Christopher Johnson <chjohnson39@gmail.com>"
LABEL description="React Discovery OpenSearch App"
ARG CIRCLE_BRANCH
ARG REACT_APP_SEARCH_API_HOST
ARG REACT_APP_SEARCH_API_COLLECTION
ARG REACT_APP_SEARCH_API_USERNAME
ARG REACT_APP_SEARCH_API_PASSWORD
ARG REACT_APP_SEARCH_APOLLO_SERVER
ENV CIRCLE_BRANCH=${CIRCLE_BRANCH} \
    REACT_APP_SEARCH_API_HOST=${REACT_APP_SEARCH_API_HOST} \
    REACT_APP_SEARCH_API_COLLECTION=${REACT_APP_SEARCH_API_COLLECTION} \
    REACT_APP_SEARCH_API_USERNAME=${REACT_APP_SEARCH_API_USERNAME} \
    REACT_APP_SEARCH_API_PASSWORD=${REACT_APP_SEARCH_API_PASSWORD} \
    REACT_APP_SEARCH_APOLLO_SERVER=${REACT_APP_SEARCH_APOLLO_SERVER}
RUN printenv
WORKDIR /srv/react-discovery
RUN git clone https://github.com/christopher-h-johnson/react-discovery.git ./
RUN git checkout ${CIRCLE_BRANCH}
RUN npm i npm@latest -g
RUN npm install
RUN npm run build

EXPOSE 3000

CMD [ "npm", "start", "--workspace=packages/react-discovery-elasticsearch-app" ]
