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
} from "../ui/alert-dialog"
import { useState } from "react"
import { DialogContext } from "@/hooks/use-dialog"

const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [url, setUrl] = useState<string | null>()
  return (
    <DialogContext.Provider value={setUrl}>
      {children}
      <AlertDialog open={!!url} onOpenChange={(open) => !open && setUrl(null)}>
        <AlertDialogContent id="global-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Open external link?</AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-3 w-full">
              <span>You are leaving to visit an external link:</span>
              <Input
                id="input-url-disabled"
                type="url"
                placeholder={url || ""}
                disabled
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setUrl(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <a href={url || ""} target="_blank" rel="noopener noreferrer">Open</a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DialogContext.Provider>
  )
}

export { DialogProvider }