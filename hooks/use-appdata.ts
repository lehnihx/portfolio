import type { DataContextValue } from '@/lib/types'
import { createContext, useContext } from 'react'

export const DataContext = createContext<DataContextValue>({
	status: 'loading',
})

export const useAppData = () => useContext(DataContext)
