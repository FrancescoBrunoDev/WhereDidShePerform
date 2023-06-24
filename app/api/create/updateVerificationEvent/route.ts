import { PrismaClient } from "@prisma/client"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function PUT(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    })

    if (user?.role === "USER") {
      return new Response("Unauthorized. You must be admin to use this API", {
        status: 401,
      })
    }

    const body = await req.json()
    console.log(body, "body")

    const updatedEvent = await prisma.event.update({
      where: {
        uid: body.eventId,
      },
      data: {
        stateVerification: body.stateVerification,
      },
    })

    const updateUserEventVerification =
      await prisma.userEventVerification.updateMany({
        where: {
          eventId: body.eventId,
        },
        data: {
          stateVerification: body.stateVerification,
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
