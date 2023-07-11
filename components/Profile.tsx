import Link from "next/link"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { UserAccountNav } from "@/components/UserAccountNav"

const Profile = async (): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  return (
    <>
      {!session?.user ? (
        <Link href="/sign-in" className="group/item">
          <div
            className={
              buttonVariants({
                size: "sm",
                variant: "ghost",
              }) +
              "group/edit flex items-center gap-2 text-sm text-primary dark:text-primary group-hover/item:dark:hover:text-background"
            }
          >
            <span className="">Login</span>
            <div className="h-5 w-5 rounded-full bg-primary dark:hover:bg-background" />
            <span className="sr-only">Login</span>
          </div>
        </Link>
      ) : (
        <UserAccountNav user={session.user} />
      )}
    </>
  )
}

export default Profile
