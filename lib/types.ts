import type { AppData } from './data'

export type DataContextValue =
	| { status: 'loading' }
	| { status: 'error'; error: string }
	| { status: 'ok'; data: AppData }
