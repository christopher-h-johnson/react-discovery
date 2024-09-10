import '@react-discovery/i18n'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createTheme, StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles'
import { OpenSearchProvider, setViewIdMap, store } from '@react-discovery/internal'
import { DetailView } from '@react-discovery/views'
import { getNumberOfWorkspaceNodesForId, getWorkspaceViewIdMap } from '@react-discovery/workspace'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { DiscoveryApp, Landing, ResultsList, Settings, Workspace } from './components'

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
    path: '/workspace',
    element: (
        <OpenSearchProvider useHistory={true}>
            <DiscoveryApp component={<Workspace />}/>
        </OpenSearchProvider>
    )
  }
])

const client = new ApolloClient({
  uri: process.env.REACT_APP_SEARCH_APOLLO_SERVER,
  cache: new InMemoryCache()
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
