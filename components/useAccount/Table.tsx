"use client"

import { useState } from "react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { format } from "date-fns"

import { EventDeletePayload } from "@/lib/validators/deleteEvent"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"

import { Badge } from "../ui/badge"

interface TableProfileProps {
  events: any[]
}

const TableProfile: React.FC<TableProfileProps> = ({ events }) => {
  const [eventList, setEventList] = useState(events) // Use state to manage the events array

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
      setEventList((prevEvents) =>
        prevEvents.filter((event) => event.uid !== eventId)
      )
    },
  })

  return (
    <div className="max-w-3xl">
      <h2 className="mt-2 text-xl font-black">Events</h2>
      {events.length > 0 && (
        <div className="rounded-lg bg-secondary p-1">
          <div className="mb-2 grid grid-cols-5 rounded-lg bg-background p-2 font-bold">
            <div>Title</div>
            <div>Created at</div>
            <div>Category</div>
            <div>Status</div>
            <div />
          </div>
          <ScrollArea className="h-[300px]">
            {eventList.map((event) => {
              const createdAt = new Date(event.createdAt)
              const formattedDateCreatedAt = format(createdAt, "MM/dd/yyyy")
              const date = new Date(event.date)
              const formattedDate = format(date, "MM/dd/yyyy")

              return (
                <>
                  <HoverCard key={event.uid}>
                    <div
                      className="grid h-fit grid-cols-5 items-center gap-2 rounded-lg p-2 text-sm"
                      key={event.uid}
                    >
                      <div className="flex items-center gap-2">
                        <HoverCardTrigger>
                          <Icons.info className="h-4 w-4 stroke-primary" />
                        </HoverCardTrigger>
                        <span>{event.title}</span>
                      </div>
                      <div>{formattedDateCreatedAt}</div>
                      <div>{event.category}</div>
                      <div>
                        <Badge className="text bg-orange-500">verifing</Badge>
                      </div>
                      <div className="flex space-x-2">
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
                        <Link
                          href={`/profile/eventInfo/${event.uid}`}
                          className={buttonVariants({
                            className: " py-2",
                            size: "xs",
                            variant: "default",
                          })}
                        >
                          edit
                        </Link>
                      </div>
                    </div>
                    <HoverCardContent align="start" className="text-xs">
                      <span>date: {formattedDate}</span>
                    </HoverCardContent>
                  </HoverCard>
                  <Separator className="border-primary" />
                </>
              )
            })}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export default TableProfile
