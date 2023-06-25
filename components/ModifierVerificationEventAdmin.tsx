import axios from "axios"

import { StateVerification } from "@/types/database"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Badge } from "./ui/badge"

interface ModifierVerificationEventProps {
  eventId: number | string
  verificationStatus: StateVerification
}

const ModifierVerificationEventAdmin = ({
  eventId,
  verificationStatus,
}: ModifierVerificationEventProps) => {
  const handleStateChange = async (
    value: StateVerification,
    eventId: ModifierVerificationEventProps
  ) => {
    try {
      const response = await axios.put(`api/create/updateVerificationEvent`, {
        stateVerification: value,
        eventId: eventId,
      })

      console.log("response", response)
      if (response.status === 200) {
        // Request successful
        console.log("Event updated successfully")
      } else {
        // Request failed
        console.error("Failed to update event")
      }
    } catch (error) {
      console.error("An error occurred while updating event:", error)
    }
  }

  return (
    <Select
      onValueChange={(value) => {
        handleStateChange(
          value as unknown as StateVerification,
          eventId as unknown as ModifierVerificationEventProps
        )
      }}
      defaultValue={verificationStatus as unknown as string}
    >
      <SelectTrigger className="h-fit w-fit border-none bg-none p-0">
        <Badge
          className={
            (verificationStatus as unknown as string) === "VERIFIED"
              ? "bg-green-500"
              : (verificationStatus as unknown as string) === "REJECTED"
              ? "bg-destructive"
              : (verificationStatus as unknown as string) === "PENDING"
              ? "bg-orange-500"
              : (verificationStatus as unknown as string) === "NONE"
              ? "bg-gray-500"
              : ""
          }
        >
          <SelectValue placeholder="verification" />
        </Badge>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">PENDING</SelectItem>
        <SelectItem value="VERIFIED">VERIFIED</SelectItem>
        <SelectItem value="REJECTED">REJECTED</SelectItem>
        <SelectItem value="NONE">NONE</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ModifierVerificationEventAdmin
