import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { UserAvatar } from "@/components/UserAvatar"
import DashboardAdmin from "@/components/admin/DashboardAdmin"
import TableProfile from "@/components/useAccount/Table"

const prisma = new PrismaClient()

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)

  const events = await prisma.event.findMany({
    where: {
      creatorId: session?.user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  if (!session) {
    redirect("/sign-in")
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    })

    return (
      <div className="flex h-fit w-full flex-col gap-8 lg:flex-row lg:gap-0">
        <div className="flex w-full flex-col lg:w-1/3">
          <UserAvatar
            user={{
              name: session.user.name || null,
              image: session.user.image || null,
            }}
            className="hidden lg:block lg:h-20 lg:w-20"
          ></UserAvatar>
          <h1 className="text-5xl font-black">{session?.user?.name}</h1>
          <h3 className="text-xl font-black">role: {user?.role}</h3>
        </div>
        <div className=" flex w-full flex-col gap-4 lg:w-2/3">
          {user?.role === "ADMIN" && (
            <Suspense fallback={"loading"}>
              <DashboardAdmin />
            </Suspense>
          )}
          <div>
            <h2 className="text-3xl font-black">Your contributions</h2>
            <TableProfile events={events} />
            <Link
              href={`/profile/eventInfo/newEvent`}
              className={buttonVariants({ className: "mt-4" })}
            >
              create a new Event
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
