import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { Main } from '@/pages/main'
import { Contact } from './pages/contact'
import { TooltipProvider } from './components/ui/tooltip'
import {
	createBrowserRouter,
	Outlet,
	RouterProvider,
	ScrollRestoration,
} from 'react-router'
import { Products } from './pages/products'
import { Toaster } from 'sonner'
import { Legal } from './pages/legal'

const Root = () => (
	<TooltipProvider>
		<Outlet />
		<ScrollRestoration />
		<Toaster />
	</TooltipProvider>
)

const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{ path: '/', element: <Main /> },
			{ path: '/contact', element: <Contact /> },
			{ path: '/products', element: <Products /> },
			{ path: '/products/legal', element: <Legal /> },
			{ path: '*', element: <Main /> },
		],
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)
