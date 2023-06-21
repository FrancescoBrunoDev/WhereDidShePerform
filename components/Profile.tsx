import Link from "next/link"
import { getAuthSession } from "@/lib/auth"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

/**
 * Asynchronous function that renders the user profile page based on the authentication session.
 *
 * @return {JSX.Element} The JSX.Element that represents the rendered profile page or the login button.
 */
const Profile = async (): Promise<JSX.Element> => {
  const session = await getAuthSession()
  return (
    <>
      {!session?.user ? (
        <Link href="/sign-in" target="_blank" rel="noreferrer">
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.login className="h-5 w-5" />
            <span className="sr-only">Login</span>
          </div>
        </Link>
      ) : <div>sei dentro</div>}
    </>
  )
}

export default Profile
