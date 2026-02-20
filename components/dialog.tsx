import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./ui/button"
import { Input } from "@/components/ui/input"
import { AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialog } from "./ui/alert-dialog"
import { Locales } from "@/app/dictionaries"

const Dialog = ({ social, dict, children, additionalClasses }: {
  social: {
    name: string
    url: string
  }, dict: Locales, children: Readonly<React.ReactNode>, additionalClasses?: string
}) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button aria-label={social.name} className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        `size-12 rounded-full bg-accent text-accent-foreground ${additionalClasses || ""}`
      )}>
        {children}
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{dict.open_external_link}</AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col gap-3">
          <span>
            {dict.external_link}
          </span>
          <Input
            id="input-url-disabled"
            type="url"
            placeholder={social.url}
            disabled
            />
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>{dict.cancel}</AlertDialogCancel>
        <AlertDialogAction onClick={() => {window.open(social.url, "_blank")}}>{dict.open}</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)

export { Dialog }