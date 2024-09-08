import '@react-discovery/i18n'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createTheme, StyledEngineProvider, Theme, ThemeProvider } from '@mui/material/styles'
import { ElasticSearchProvider, setViewIdMap, store } from '@react-discovery/internal'
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
        <ElasticSearchProvider useHistory={true}>
          <DiscoveryApp component={<Landing />} title='Home'/>
        </ElasticSearchProvider>
    )
  },
  {
    path: '/detail/:collection/:id',
    element: (
        <ElasticSearchProvider useHistory={true}>
            <DiscoveryApp component={<DetailView actions={detailViewActions}/>}/>
        </ElasticSearchProvider>
    )
  },
  {
    path: '/search/:collection',
    element: (
        <ElasticSearchProvider useHistory={true}>
            <DiscoveryApp component={<ResultsList/>} title='React Discovery'/>
        </ElasticSearchProvider>
    )
  },
  {
    path: '/settings',
    element: (
        <ElasticSearchProvider useHistory={true}>
            <DiscoveryApp component={<Settings/>}/>
        </ElasticSearchProvider>
    )
  },
  {
    path: '/workspace',
    element: (
        <ElasticSearchProvider useHistory={true}>
            <DiscoveryApp component={<Workspace />}/>
        </ElasticSearchProvider>
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
