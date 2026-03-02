"use client"
import { Input } from "@/components/ui/input"
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog
} from "../components/ui/alert-dialog"
import Link from "next/link"
import { useDict } from "@/hooks/useDict"
import { createContext, useContext, useState } from "react"

const DialogContext = createContext<( url: string ) => void>(() => {})
const useDialog = () => useContext(DialogContext)

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const { open_external_link, external_link, cancel, open } = useDict()
  const [url, setUrl] = useState<string | null>()
  return (
    <DialogContext.Provider value={setUrl}>
      {children}
      <AlertDialog open={!!url} onOpenChange={(open) => open && setUrl(null)}>
        <AlertDialogContent id="global-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>{open_external_link}</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-3 w-full">
              <span>
                {external_link}
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
            <AlertDialogCancel onClick={() => setUrl(null)}>{cancel}</AlertDialogCancel>
            <AlertDialogAction>
              <Link href={url || ""} target="_blank" rel="noopener noreferrer">{open}</Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}

export { DialogProvider, useDialog }