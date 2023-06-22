import { PrismaClient } from "@prisma/client"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { newEventValidator } from "@/lib/validators/newEvent"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { title, location, persons, program } = newEventValidator.parse(body)

    const event = await prisma.test.create({
      data: {
        title: title,
        locationUid: location,
        personsUid: persons,
        program: program,
        creatorId: session.user.id,
      },
    })

    return new Response(event.title)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response("cannot create event", { status: 500 })
  }
}
