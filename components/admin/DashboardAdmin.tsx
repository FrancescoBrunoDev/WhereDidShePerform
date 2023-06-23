import { PrismaClient } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Table from "@/components/useAccount/Table"

const prisma = new PrismaClient()

const DashboardAdmin = async () => {
  const user = await prisma.user.findMany({
    include: {
      eventVerifications: true,
    },
  })
  console.log(user, "user")

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-black">Dashboard Admin</h1>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex gap-2">
          <Input />
          <Button>search</Button>
        </div>
        {user.map((user) => (
          <>
            <div
              key={user.id}
              className={buttonVariants({ className: "grid grid-cols-3" })}
            >
              <div>{user.name}</div>
              <div>{user.role}</div>
              <div>{user.email}</div>
            </div>
            {/*     <Table /> */}
          </>
        ))}
      </div>
    </div>
  )
}

export default DashboardAdmin
