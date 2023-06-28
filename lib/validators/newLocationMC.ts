import { z } from "zod"

export const newLocationMCValidator = z.object({
  uid: z.string(),
  coordinateCandidateId: z.number(),
  lat: z.string(),
  lon: z.string(),
})

export type newLocationMCPayload = z.infer<typeof newLocationMCValidator>
