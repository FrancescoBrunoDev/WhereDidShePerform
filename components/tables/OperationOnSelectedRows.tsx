import { Role, StateVerification } from "@prisma/client"
import { Table } from "@tanstack/react-table"

import DeleteButton from "@/components/DeleteButton"

import UpdateStateVerificationButton from "../UdateStateVerificationButton"

interface DataTablePaginationProps<TData> {
  table: Table<TData>
  userRole?: Role
}

export function OperationOnSelectedRows<TData>({
  table,
  userRole,
}: DataTablePaginationProps<TData>) {
  const selectedRows = table.getFilteredSelectedRowModel().rows
  const uidArrayForDelete = selectedRows.map((row) => (row.original as any).uid)
  const uidArrayForVerification = selectedRows.map((row) => ({
    uid: (row.original as any).uid,
    stateVerification: (row.original as any)
      .stateVerification as StateVerification,
  }))

  const eventsArray = {
    eventId: uidArrayForVerification,
  }

  return (
    <div className="mx-auto">
      <div className="flex justify-end gap-2 pt-2">
        <UpdateStateVerificationButton userRole={userRole} uid={eventsArray} />

        {uidArrayForDelete.length > 0 && (
          <div className="w-fit">
            <DeleteButton uid={uidArrayForDelete} />
          </div>
        )}
      </div>
    </div>
  )
}
