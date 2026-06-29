import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Main } from '@/pages/main'
import { Contact } from './pages/contact'
import { TooltipProvider } from './components/ui/tooltip'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Services } from './pages/services'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TooltipProvider>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='services' element={<Services />} />
					<Route path='*' element={<Main />} />
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
	</StrictMode>,
)
