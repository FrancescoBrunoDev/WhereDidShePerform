import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Role } from "@prisma/client"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserAvatar } from "@/components/UserAvatar"
import TableEvents from "@/components/tables/TableEvents"
import TablePersons from "@/components/tables/TablePersons"
import TableUsers from "@/components/tables/TableUsers"

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/sign-in")
  } else {
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        event: {
          select: {
            uid: true,
            title: true,
            createdAt: true,
            stateVerification: true,
          },
        },
        person: {
          select: {
            uid: true,
            title: true,
            createdAt: true,
            biography: true,
            stateVerification: true,
          },
        },
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
          />
          <h1 className="text-5xl font-black">{session?.user?.name}</h1>
          {user?.role === Role.ADMIN && (
            <h3 className="text-xl font-black">role: {user?.role}</h3>
          )}
          <Link href={`/query/userMap/${user?.id}`}>
            <Button>mappa</Button>
          </Link>
        </div>
        <div className=" flex w-full flex-col gap-4 lg:w-2/3">
          {user?.role === Role.ADMIN && (
            <>
              <h2 className="text-3xl font-black">Admin Dashboard</h2>
              <Suspense fallback={"loading"}>
                <TableUsers />
              </Suspense>
            </>
          )}
          <div>
            <h2 className="text-3xl font-black">Your contributions</h2>
            <Tabs defaultValue="events" className="pt-5">
              <TabsList>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="persons">Persons</TabsTrigger>
                <TabsTrigger value="works">Works</TabsTrigger>
              </TabsList>
              <TabsContent value="events">
                <TableEvents
                  profileId={user?.id}
                  userRole={user?.role}
                  events={user?.event}
                />
              </TabsContent>
              <TabsContent value="persons">
                <TablePersons
                  profileId={user?.id}
                  userRole={user?.role}
                  events={user?.person}
                />
              </TabsContent>
              <TabsContent value="works">
                <TablePersons
                  profileId={user?.id}
                  userRole={user?.role}
                  events={user?.event}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
