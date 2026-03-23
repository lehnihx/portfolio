import { createContext, useContext } from "react"

export const DialogContext = createContext<( url: string ) => void>(() => {})
export const useDialog = () => useContext(DialogContext)