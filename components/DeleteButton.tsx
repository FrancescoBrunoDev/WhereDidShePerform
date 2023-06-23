import { Button } from "./ui/button"

interface DeleteButtonProps {
  event: any
  isLoading: boolean
  deleteEvent: any
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  event,
  isLoading,
  deleteEvent,
}) => {
  return (
    <>
      <Button
        isLoading={isLoading}
        onClick={() => {
          deleteEvent(event.uid)
        }}
        className="py-2"
        size={"xs"}
        variant={"destructive"}
      >
        delete
      </Button>
    </>
  )
}
