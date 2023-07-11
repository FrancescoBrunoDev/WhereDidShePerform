import { Occupation } from "@prisma/client"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { newPersonValidator } from "@/lib/validators/newPerson"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { title, biography, link, occupations } = body // fix the parsing with zod
    console.log(occupations, "occupations")
    const person = await db.person.findMany({
      include: {
        biography: true,
      },
      where: {
        title: title,
        biography: {
          birth: biography.birth,
          death: biography.death,
        },
      },
    })

    if (person.length > 0) {
      return new Response("Person already exists", { status: 422 })
    }

    const newPerson = await db.person.create({
      include: {
        biography: true,
        occupations: true,
      },
      data: {
        title: title,
        biography: {
          create: {
            birth: biography.birth,
            death: biography.death,
          },
        },
        occupations: {
          createMany: {
            data: occupations.flatMap(
              (occupationData: { occupation: Occupation }) => {
                return {
                  occupation: occupationData.occupation,
                }
              }
            ),
          },
        },
        link: link,
        createdAt: new Date(),
        creatorId: session.user.id,
        updatedAt: new Date(),
      },
    })

    const personCreated = await db.person.findMany({
      include: {
        biography: true,
      },
      where: {
        title: title,
        biography: {
          birth: biography.birth,
          death: biography.death,
        },
      },
    })

    if (newPerson) {
      await Promise.all(
        occupations.map(async (occupationData: { occupation: Occupation }) => {
          await db.occupations.create({
            data: {
              occupation: occupationData.occupation,
              personUid: personCreated[0].uid,
            },
          })
        })
      )
    }

    console.log(newPerson, "newPerson")

    return new Response("success")
  } catch (error) {
    return new Response("cannot create person", { status: 500 })
  }
}
