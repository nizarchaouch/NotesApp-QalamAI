import { Trash2Icon } from "lucide-react"
import type { ReactNode } from "react"
import { useIntl } from "react-intl"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

type DeleteDialogProps = {
  handleDelete: () => void
  buttonText?: ReactNode
  title?: ReactNode
  description?: ReactNode
}

export function DeleteDialog({ handleDelete, buttonText, title, description }: DeleteDialogProps) {
  const intl = useIntl()

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          {buttonText || intl.formatMessage({ id: "noteDetail.delete" })}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            {title || intl.formatMessage({ id: "deleteDialog.defaultTitle" })}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description || intl.formatMessage({ id: "deleteDialog.defaultDescription" })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" className="cursor-pointer">
            {intl.formatMessage({ id: "deleteDialog.cancel" })}
          </AlertDialogCancel>
          <AlertDialogAction variant="destructive" className="cursor-pointer" onClick={handleDelete}>
            {intl.formatMessage({ id: "deleteDialog.confirm" })}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
