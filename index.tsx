import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Main } from '@/pages/main'
import { Contact } from './pages/contact'
import { isContact } from './lib/utils'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{isContact() ?
			<Contact />
		:	<Main />}
	</StrictMode>,
)
