import { useDialog } from "@/hooks/use-dialog"
import { Button } from "../ui/button"

export const Link = ({
  url, children, ...props
}: {
  url: string
  children: React.ReactNode
  [key: string]: unknown
}) => {
  const dialog = useDialog()
  return (
    <Button
      variant="link"
      rel="noopener noreferrer"
      onClick={() => {
        dialog(url)
      }}
      {...props}
    >
      {children}
    </Button>
  )
}