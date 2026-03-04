"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input"
import { useDict } from "@/hooks/useDict"
import { ANIMATION } from "@/lib/utils"
import { Upload } from "lucide-react"
import { motion } from "motion/react"
import { useState } from "react"

export const Ask = () => {
  const { ask, questions } = useDict()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("submitted")
  }
  const { send_file, cancel, send } = useDict()
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };
  return (
    <motion.article {...ANIMATION} className="my-16 flex flex-col justify-center items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl text-foreground">
        {ask}
      </h2>
      <div className="flex items-center gap-2">
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="outline" className="h-full rounded-full"><Upload/></Button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-lg max-h-[calc(100dvh-1rem)] overflow-x-hidden overflow-y-auto p-4 sm:p-6">
                <DialogTitle>{send_file}</DialogTitle>
                <FileUpload onChange={handleFileUpload} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">{cancel}</Button>
                </DialogClose>
                <Button type="submit">{send}</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
        <PlaceholdersAndVanishInput
          placeholders={questions}
          onChange={handleChange}
          onSubmit={onSubmit}
        />
      </div>
    </motion.article>
  )
}