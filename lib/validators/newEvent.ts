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
  date: z.string().refine((value) => dateFormatRegex.test(value), {
    message: "Invalid date format. Use yyyy-MM-dd",
    path: ["date"],
  }),
  location: z.string(),
  persons: z.array(
    z.object({
      title: z.string(),
      mUid: z.string(),
    })
  ),
  program: z.string().min(3, "Program must be at least 3 characters"),
})

export type NewEventPayload = z.infer<typeof newEventValidator>
