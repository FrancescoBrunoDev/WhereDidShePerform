import { StateVerification } from "@prisma/client"
import { z } from "zod"

import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { newLocationMCValidator } from "@/lib/validators/newLocationMC"

export async function POST(req: Request) {
  try {
    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { uid, coordinateCandidateId, lat, lon } =
      newLocationMCValidator.parse(body)

    const locationMCExists = await db.locationMC.findUnique({
      where: { uid: uid },
    })

    if (!locationMCExists) {
      const locationMC = await db.locationMC.create({
        data: {
          uid: uid,
        },
      })
    }

    const coordinateCandidate = await db.coordinateCandidate.findUnique({
      where: {
        coordinateCandidateId: coordinateCandidateId,
      },
    })

    if (!coordinateCandidate) {
      const createCoordinateCandidate = await db.coordinateCandidate.create({
        data: {
          locationMC: {
            connect: {
              uid: uid,
            },
          },
          coordinateCandidateCount: {
            connect: {
              coordinateCandidateId: coordinateCandidateId,
            },
          },
          lat: lat,
          lon: lon,
        },
      })
    }
    console.log(coordinateCandidate, "coordinateCandidate")

    const coordinateCandidateCount =
      await db.coordinateCandidateCount.findUnique({
        where: {
          coordinateCandidateId: coordinateCandidateId,
        },
      })

    if (!coordinateCandidateCount) {
      const createdCoordinateCandidateCount =
        await db.coordinateCandidateCount.create({
          data: {
            count: 1,
            coordinateCandidate: {
              connect: {
                coordinateCandidateId: coordinateCandidateId,
              },
            },
            coordinateCandidateId: coordinateCandidateId,
            locationMCId: uid,
          },
        })
    }

    const updateCoordinateCandidateCount =
      await db.coordinateCandidateCount.update({
        where: {
          coordinateCandidateId: coordinateCandidateId,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      })

    return new Response("success", { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 422 })
    }
    return new Response("cannot create event", { status: 500 })
  }
}
