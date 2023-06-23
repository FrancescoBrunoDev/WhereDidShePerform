import { z } from "zod"

const validCategories = [
  "Season",
  "Concert",
  "Religious_Event",
  "Music_Theater",
]

const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/

export const newEventValidator = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  category: z.string().refine((value) => validCategories.includes(value), {
    message: "Invalid category",
    path: ["category"],
  }),
  date: z.string().refine(
    (value) => {
      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      return dateFormatRegex.test(value)
    },
    {
      message: "Invalid date format. Use yyyy-MM-ddTHH:mm:ss.sssZ",
      path: ["date"],
    }
  ),
  locationsM: z.array(
    z.object({
      title: z.string(),
      mUid: z.string(),
    })
  ),
  personsM: z.array(
    z.object({
      title: z.string(),
      mUid: z.string(),
    })
  ),
  worksM: z.array(
    z.object({
      title: z.string(),
      mUid: z.string(),
    })
  ),
  uid: z.string(),
})

export type NewEventPayload = z.infer<typeof newEventValidator>
