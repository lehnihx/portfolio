"use client"

import { Input } from "@/lib/ui/input"
import { AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialog } from "../lib/ui/alert-dialog"
import Link from "next/link"
import { useDict } from "@/lib/dict"
import { createContext, useContext, useState } from "react"

const DialogContext = createContext<( url: string ) => void>(() => {})
const useDialog = () => useContext(DialogContext)

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const dict = useDict()
  const [url, setUrl] = useState<string | null>()
  return (
    <DialogContext.Provider value={setUrl}>
      {children}
      <AlertDialog open={!!url} onOpenChange={(open) => open && setUrl(null)}>
        <AlertDialogContent id="global-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>{dict.open_external_link}</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-3 w-full">
              <span>
                {dict.external_link}
              </span>
              <Input
                id="input-url-disabled"
                type="url"
                placeholder={url || ""}
                disabled
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUrl(null)}>{dict.cancel}</AlertDialogCancel>
            <AlertDialogAction>
              {/* rel="noopener noreferrer" is required for security — without it the new tab can access the page via window.opener. */}
              <Link href={url || ""} target="_blank" rel="noopener noreferrer">{dict.open}</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}

export { DialogProvider, useDialog }