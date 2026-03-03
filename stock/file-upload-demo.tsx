"use client";
import React, { useState } from "react";
import { FileUpload } from "@/stock/ui/file-upload";
  import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react";

export default function AskFileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-full rounded-full"><Upload/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm max-w-sm  ">
            <DialogTitle>Send a file to Lenix</DialogTitle>
            <FileUpload onChange={handleFileUpload} />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Send</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
