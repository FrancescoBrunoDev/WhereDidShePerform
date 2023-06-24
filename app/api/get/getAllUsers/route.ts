import { PrismaClient } from "@prisma/client"

import { getAuthSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function GET() {
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

    const users = await prisma.user.findMany({
      include: {
        eventVerifications: true,
      },
    })

    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Unable to retrieve users", { status: 500 })
  }
}
