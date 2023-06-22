import { z } from "zod"

export const newLocationValidator = z.object({
  title: z.string().max(40, "Title must be at least 3 characters"),
})

export type NewLocationPayload = z.infer<typeof newLocationValidator>
