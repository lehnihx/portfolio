import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Layout } from './layout'
import { DataProvider } from './lib/context'
import { Contact } from './pages/contact'

const { hostname } = new URL(window.location.href)
const [host] = hostname.split('.')
console.log(host, hostname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {host === 'lenix' ? <DataProvider>
      <Layout />
    </DataProvider>
    : host === 'contact' && <Contact />}
  </StrictMode>,
)