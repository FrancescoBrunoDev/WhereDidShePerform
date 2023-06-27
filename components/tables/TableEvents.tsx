"use client"

import { useEffect, useState } from "react"
import { Role } from "@prisma/client"
import axios from "axios"

import { EventTable } from "@/types/database"
import { columns } from "@/components/tables/ColumsTableEvents"
import { DataTable } from "@/components/tables/DataTableEvents"

export default function TableEvents({
  events,
  userId,
  userRole,
}: {
  events?: any
  userId?: string
  userRole?: Role
}) {
  const [data, setData] = useState<EventTable[]>([])
  const [role, setRole] = useState<Role>(Role.USER)

  useEffect(() => {
    async function fetchData() {
      if (!events) {
        const payload = {
          userId: userId,
        }
        const { data } = await axios.post("/api/get/getEventsByUser", payload)

        if (data.role) {
          setRole(data.role as Role) // set the role in case of open as modal
        }
        setData(data.events as EventTable[])
      } else {
        setRole(userRole as Role) // set the role in any case
        setData(events)
      }
    }

    fetchData()
  }, [events, userId, userRole])

  return (
    <div className="mx-auto">
      <DataTable userRole={role} columns={columns} data={data} />
    </div>
  )
}
