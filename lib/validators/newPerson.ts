import { Occupation } from "@prisma/client"
import { z } from "zod"

export const newPersonValidator = z.object({
  title: z.string(),
  biography: z.object({
    birth: z.date(),
    death: z.date().nullable(),
  }),
  link: z.string().url(),
  occupations: z.array(
    z.object({
      occupation: z.nativeEnum(Occupation),
    })
  ),
})

export type newPersonPayload = z.infer<typeof newPersonValidator>
