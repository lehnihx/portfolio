import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Layout } from './layout'
import { DataProvider } from './lib/context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DataProvider>
      <Layout />
    </DataProvider>
  </StrictMode>,
)