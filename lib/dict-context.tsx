"use client"
import { Locales } from '@/app/dictionaries'
import { createContext, useContext } from 'react'

const DictContext = createContext<Locales>({} as Locales)
export const DictProvider = ({ dict, children }: { dict: Locales, children: React.ReactNode }) =>
  <DictContext.Provider value={dict}>{children}</DictContext.Provider>

export const useDict = () => useContext(DictContext)