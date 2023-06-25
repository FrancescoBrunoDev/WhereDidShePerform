import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { StateVerification } from "@prisma/client"

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    })

    const body = await req.json()

    if (user?.role === "USER") {
      console.log(body.stateVerification, "body.stateVerification")
      if(body.stateVerification === StateVerification.VERIFIED || body.stateVerification === StateVerification.REJECTED) {
        return new Response("Forbidden. You can accept or reject an event only if you are an admin", { status: 403 })
      }
      const updateEventUser = await db.event.updateMany({
        where: {
          uid: body.eventId,
          creatorId: session.user.id,
        },
        data: {
          stateVerification: body.stateVerification as StateVerification,
        },
      })

      const updateUserEventVerification =
        await db.userEventVerification.updateMany({
          where: {
            eventId: body.eventId,
            userId: session.user.id,
          },
          data: {
            stateVerification: body.stateVerification as StateVerification,
          },
        })
        
    }

    const updatedEvent = await db.event.update({
      where: {
        uid: body.eventId,
      },
      data: {
        stateVerification: body.stateVerification as StateVerification,
      },
    })

    const updateUserEventVerification =
      await db.userEventVerification.updateMany({
        where: {
          eventId: body.eventId,
        },
        data: {
          stateVerification: body.stateVerification as StateVerification,
        },
      })

    return new Response("succes", { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response("cannot create event", { status: 500 })
  }
}
