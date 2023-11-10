import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Layout } from './components/layout/index.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Albums from './pages/Albums.jsx'
import Songs from './pages/Songs.jsx'
import SongsOld from './pages/SongsOld.jsx'

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: '/',
    element: <SongsOld />
  },
  {
    path: '/songs',
    element: <Songs />
  },
  {
    path: '/albums',
    element: <Albums />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
)
