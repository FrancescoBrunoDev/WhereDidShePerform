import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { newEventValidator } from "@/lib/validators/newEvent"

enum Category {
  Season = "Season",
  Concert = "Concert",
  Religious_Event = "Religious_Event",
  Music_Theater = "Music_Theater",
}

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    console.log(body, "body")
    const { title, locationsM, personsM, worksM, date, category, uid, link, comment } =
      newEventValidator.parse(body)

    const categoryValue = Category[category as keyof typeof Category]

    const event = await db.event.update({
      where: {
        uid: uid,
      },
      data: {
        title: title,
        date: date,
        category: categoryValue,
        locationsM: locationsM,
        updatedAt: new Date(),
        personsM: personsM,
        worksM: worksM,
        link: link,
        comment: comment,
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
