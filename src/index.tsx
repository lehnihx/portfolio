import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Layout } from './layout'
import { DataProvider } from './lib/context'
import { Contact } from './pages/contact'
import { isContact } from './lib/utils'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isContact() ? <Contact /> : <DataProvider>
      <Layout />
    </DataProvider>}
  </StrictMode>,
)