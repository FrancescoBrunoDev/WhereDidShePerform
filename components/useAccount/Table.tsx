"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"

import { buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import DeleteButton from "@/components/DeleteButton"
import { Icons } from "@/components/icons"

import { Badge } from "../ui/badge"

interface TableProfileProps {
  events: any[]
}

const TableProfile: React.FC<TableProfileProps> = ({ events }) => {
  const [eventList, setEventList] = useState(events) // Use state to manage the events array
  return (
    <div className="max-w-3xl">
      <h2 className="my-2 w-fit rounded-lg bg-secondary p-2 text-xl font-black">
        Events
      </h2>
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
                <div key={event.uid}>
                  <HoverCard>
                    <div className="grid h-fit grid-cols-5 items-center gap-2 rounded-lg p-2 text-sm">
                      <div className="flex items-center gap-2">
                        <HoverCardTrigger>
                          <Icons.info className="h-4 w-4 stroke-primary" />
                        </HoverCardTrigger>
                        <span>{event.title}</span>
                      </div>
                      <div>{formattedDateCreatedAt}</div>
                      <div>{event.category}</div>
                      <div>
                        <Badge
                          className={
                            event.stateVerification === "VERIFIED"
                              ? "bg-green-500"
                              : event.stateVerification === "REJECTED"
                              ? "bg-destructive"
                              : event.stateVerification === "PENDING"
                              ? "bg-orange-500"
                              : ""
                          }
                        >
                          {event.stateVerification}
                        </Badge>
                      </div>
                      <div className="flex space-x-2">
                        <DeleteButton
                          event={event}
                          setEventList={setEventList}
                        />
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
                </div>
              )
            })}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}

export default TableProfile
