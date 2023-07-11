import { Role, StateVerification } from "@prisma/client"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

interface PersonVerification {
  uid: string
  stateVerification: StateVerification
}

export async function POST(req: Request) {
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

    await Promise.all(
      body.map(async (person: PersonVerification) => {
        
         if (user?.role === Role.USER) {
          if (
            person.stateVerification === StateVerification.VERIFIED ||
            person.stateVerification === StateVerification.REJECTED
          ) {
            return new Response(
              "Forbidden. You can accept or reject a person only if you are an admin",
              { status: 403 }
            )
          }

          await db.person.updateMany({
            where: {
              uid: person.uid,
              creatorId: session.user.id,
            },
            data: {
              stateVerification: person.stateVerification as StateVerification,
            },
          })

          await db.userEventVerification.updateMany({
            where: {
              eventId: person.uid,
              userId: session.user.id,
            },
            data: {
              stateVerification: person.stateVerification as StateVerification,
            },
          })
        }

        await db.person.update({
          where: {
            uid: person.uid,
          },
          data: {
            stateVerification: person.stateVerification as StateVerification,
          },
        })

        await db.userPersonVerification.updateMany({
          where: {
            personId: person.uid,
          },
          data: {
            stateVerification: person.stateVerification as StateVerification,
          },
        }) 
      })
    )

    return new Response("success", { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response("cannot update validation person", { status: 500 })
  }
}
