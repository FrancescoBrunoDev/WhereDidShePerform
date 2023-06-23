import Link from "next/link"
import { redirect } from "next/navigation"
import { PrismaClient } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { UserAvatar } from "@/components/UserAvatar"
import TableProfile from "@/components/useAccount/Table"

const prisma = new PrismaClient()

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)

  const events = await prisma.event.findMany({
    where: {
      creatorId: session?.user?.id,
    },
  })

  if (!session) {
    redirect("/sign-in")
  } else {
    return (
      <div className="w-ful flex flex-col gap-8 lg:flex-row lg:gap-0">
        <div className="flex w-full flex-col lg:w-1/3">
          <UserAvatar
            user={{
              name: session.user.name || null,
              image: session.user.image || null,
            }}
            className="hidden lg:block lg:h-20 lg:w-20"
          ></UserAvatar>
          <h1 className="text-5xl font-black">{session?.user?.name}</h1>
        </div>
        <div className=" w-full lg:w-2/3">
          <h2 className="text-3xl font-black">Your contributions</h2>
          {/* show contributions */}
          <TableProfile events={events} />
          <Link
            href={`/profile/eventInfo/newEvent`}
            className={buttonVariants({ className: "mt-4" })}
          >
            create a new Event
          </Link>
        </div>
      </div>
    )
  }
}

export default ProfilePage
