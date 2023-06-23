import { z } from "zod"

export const eventDeleteValidator = z.object({
  eventId: z.any(),
})

export type EventDeletePayload = z.infer<typeof eventDeleteValidator>
