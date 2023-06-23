import { PrismaClient } from "@prisma/client"

import { getAuthSession } from "@/lib/auth"
import { GetInfoPerson } from "@/app/api/musiconn"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()

    const { uid } = body
    const event = await prisma.event.findUnique({
      where: {
        uid: uid,
      },
    })

    return new Response(JSON.stringify(event))
  } catch (error) {
    return new Response("cannot get event", { status: 500 })
  }
}
