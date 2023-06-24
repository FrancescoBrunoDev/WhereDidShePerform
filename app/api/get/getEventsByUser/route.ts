import { PrismaClient } from "@prisma/client"

import { getAuthSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET(req: Request) {
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
      return new Response("Unauthorized. You must be admin to use this API", { status: 401 })
    }

    const body = await req.json()

    const { uid } = body
    const event = await prisma.event.findMany({
      where: {
        creatorId: uid,
      },
    })

    return new Response(JSON.stringify(event))
  } catch (error) {
    return new Response("cannot get event", { status: 500 })
  }
}
