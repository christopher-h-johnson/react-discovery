import '@react-discovery/i18n'
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client'
import { RestLink } from 'apollo-link-rest'
import { createTheme, StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles'
import { SignIn } from '@react-discovery/firebase'
import { OpenSearchProvider, setViewIdMap, store } from '@react-discovery/internal'
import { DetailView } from '@react-discovery/views'
import { getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap } from '@react-discovery/workspace'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DiscoveryApp, Landing, ResultsList, Settings, Workspace } from './components'
import pThrottle from 'p-throttle'

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}

const detailViewActions = {
  getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap, setViewIdMap
}

export const theme = createTheme({})

const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <OpenSearchProvider useHistory={true}>
          <DiscoveryApp component={<Landing />} title='Home'/>
        </OpenSearchProvider>
    )
  },
  {
    path: '/detail/:collection/:id',
    element: (
        <OpenSearchProvider useHistory={true}>
            <DiscoveryApp component={<DetailView actions={detailViewActions}/>}/>
        </OpenSearchProvider>
    )
  },
  {
    path: '/search/:collection',
    element: (
        <OpenSearchProvider useHistory={true}>
            <DiscoveryApp component={<ResultsList/>} title='React Discovery'/>
        </OpenSearchProvider>
    )
  },
  {
    path: '/settings',
    element: (
        <OpenSearchProvider useHistory={true}>
            <DiscoveryApp component={<Settings/>}/>
        </OpenSearchProvider>
    )
  },
  {
    path: '/signin',
    element: (
      <OpenSearchProvider useHistory={true}>
        <DiscoveryApp component={<SignIn/>}/>
      </OpenSearchProvider>
    )
  },
  {
    path: '/workspace',
    element: (
        <OpenSearchProvider useHistory={true}>
            <DiscoveryApp component={<Workspace />}/>
        </OpenSearchProvider>
    )
  }
],
{
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
})

const throttle = pThrottle({ limit: 20, interval: 1000 })

const restLink = new RestLink({
  uri: process.env.REACT_APP_SEARCH_APOLLO_SERVER,
  customFetch: throttle((uri, config) => {
    return fetch(uri, config)
  })
})

const httpLink = createHttpLink({ uri: process.env.REACT_APP_SEARCH_APOLLO_SERVER + '/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([restLink, httpLink])
})

const root = createRoot(document.getElementById('app'))
root.render(
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <ApolloProvider client={client}>
                <RouterProvider router={router}/>
            </ApolloProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>)

if ((window as any).Cypress) {
  (window as any).store = store
}
