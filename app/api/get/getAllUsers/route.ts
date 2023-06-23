import { PrismaClient } from "@prisma/client"

import { getAuthSession } from "@/lib/auth"

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const users = await prisma.user.findMany()
    console.log(users, "users")

    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Unable to retrieve users", { status: 500 })
  }
}
