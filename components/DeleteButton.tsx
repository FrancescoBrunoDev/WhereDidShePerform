import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { EventDeletePayload } from "@/lib/validators/deleteEvent"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { buttonVariants } from "./ui/button"

interface DeleteButtonProps {
  event: any
  isLoading?: boolean
  setEventList?: any
}

interface TableProfileProps {
  events: any[]
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ event, setEventList }) => {
  const { mutate: deleteEvent, isLoading } = useMutation({
    mutationFn: async (eventId) => {
      const payload: EventDeletePayload = {
        eventId: eventId,
      }

      const { data } = await axios.post("/api/create/deleteEvent", payload)
      return data as String
    },
    onSuccess: (response, eventId) => {
      // Remove the deleted event from the event list
      setEventList((prevEvents: any[]) =>
        prevEvents.filter((event) => event.uid !== eventId)
      )
    },
  })
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger
          className={buttonVariants({
            className: " py-2",
            size: "xs",
            variant: "destructive",
          })}
        >
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              event.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                deleteEvent(event.uid)
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default DeleteButton
