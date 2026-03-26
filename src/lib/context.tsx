import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { fetchAppData, type AppData } from './data'

type DataContextValue =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'ok'; data: AppData }

const DataContext = createContext<DataContextValue>({ status: 'loading' })

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [value, setValue] = useState<DataContextValue>({ status: 'loading' })

  useEffect(() => {
    fetchAppData()
      .then(data => { setValue({ status: 'ok', data }) })
      .catch((e: unknown) => { setValue({ status: 'error', error: String(e) }) })
  }, [])

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useAppData = () => useContext(DataContext)