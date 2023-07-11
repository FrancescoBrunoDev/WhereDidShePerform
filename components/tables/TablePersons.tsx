"use client"

import { useEffect } from "react"
import { useStoreProfile } from "@/store/useStoreProfile"
import { Role } from "@prisma/client"

import { columns } from "@/components/tables/persons/ColumsTablePersons"
import { DataTable } from "@/components/tables/persons/DataTablePersons"

export default function TablePersons({
  events,
  userId,
  userRole,
  profileId,
}: {
  events?: any
  userId?: string
  userRole?: Role
  profileId?: string
}) {
  const [data, role, fetchData, setUserId] = useStoreProfile((state) => [
    state.events,
    state.role,
    state.fetchData,
    state.setUserId,
  ])

  useEffect(() => {
    fetchData(events, userId, userRole)
    setUserId(profileId)
  }, [events, userId, userRole, profileId])

  return (
    <div className="mx-auto">
      <DataTable userRole={role} columns={columns} data={data} type="persons" />
    </div>
  )
}
