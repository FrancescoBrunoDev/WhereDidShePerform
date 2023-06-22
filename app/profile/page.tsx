import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { UserAvatar } from "@/components/UserAvatar"

const ProfilePage = async () => {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/sign-in")
  } else {
    return (
      <div className="w-full flex">
        <div className="flex w-1/3 flex-col">
          <UserAvatar
            user={{
              name: session.user.name || null,
              image: session.user.image || null,
            }}
            className="h-20 w-20"
          ></UserAvatar>
          <h1 className="text-7xl font-black">{session?.user?.name}</h1>
        </div>
        <div className="w-2/3">
          <h2 className="text-3xl font-black">Your contributions</h2>
          <Link
            href="/profile/newEvent"
            className={buttonVariants({ className: "mt-4" })}
          >
            create a new Event
          </Link>
          {/* show contributions */}
        </div>
      </div>
    )
  }
}

export default ProfilePage
