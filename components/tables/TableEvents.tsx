"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import { EventTable } from "@/types/database"
import { columns } from "@/components/tables/ColumsTableEvents"
import { DataTable } from "@/components/tables/DataTableEvents"

export default function TableEvents({
  events,
  userId,
}: {
  events?: any
  userId?: string
}) {
  const [data, setData] = useState<EventTable[]>([])

  useEffect(() => {
    async function fetchData() {
      if (!events) {
        const payload = {
          userId: userId,
        }
        console.log(events, "events")
        const { data } = await axios.post("/api/get/getEventsByUser", payload)

        setData(data as EventTable[])
      } else {
        setData(events)
      }
    }

    fetchData()
  }, []) // Empty dependency array to run the effect only once

  console.log(data, "data")

  return (
    <div className="mx-auto">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
