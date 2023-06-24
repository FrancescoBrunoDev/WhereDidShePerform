import axios from "axios"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { buttonVariants } from "./ui/button"

interface ModifierVerificationEventProps {
  eventId: number
  verificationStatus?: string
}

enum VerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

const ModifierVerificationEvent = ({
  eventId,
  verificationStatus,
}: ModifierVerificationEventProps) => {
  const handleStateChange = async (
    value: VerificationStatus,
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
          value as VerificationStatus,
          eventId as unknown as ModifierVerificationEventProps
        )
      }}
      defaultValue={verificationStatus}
    >
      <SelectTrigger
        className={buttonVariants({
          className: "w-[180px]",
          variant: "ghost",
          size: "xs",
        })}
      >
        <SelectValue placeholder="verification" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="PENDING">pending</SelectItem>
        <SelectItem value="VERIFIED">verified</SelectItem>
        <SelectItem value="REJECTED">rejected</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ModifierVerificationEvent
