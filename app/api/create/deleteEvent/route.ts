import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { eventDeleteValidator } from "@/lib/validators/deleteEvent"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { eventId } = eventDeleteValidator.parse(body)

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const event = await db.event.findUnique({
      where: {
        uid: eventId,
      },
    })

    if (!event) {
      return new Response("Event not found", { status: 404 })
    }

    if (event.creatorId !== session.user.id) {
      return new Response("Forbidden", { status: 403 })
    }

    await db.userEventVerification.deleteMany({
      where: {
        eventId: eventId,
      },
    })

    await db.event.delete({
      where: {
        uid: eventId,
      },
    })

    return new Response("Event deleted successfully", { status: 200 })
  } catch (error) {
    console.error("Error deleting event:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
