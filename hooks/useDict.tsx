"use client"
import { Dict } from '@/lib/dictionaries'
import { createContext, useContext } from 'react'

const DictContext = createContext<Dict>({} as Dict)

export const DictProvider = ({
  dict, children
}: {
  dict: Dict,
  children: React.ReactNode
}) => (
  <DictContext.Provider value={dict}>{children}</DictContext.Provider>
)

export const useDict = () => useContext(DictContext)