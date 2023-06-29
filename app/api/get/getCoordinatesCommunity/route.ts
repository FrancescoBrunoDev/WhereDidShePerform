import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const query = await req.json()

    const session = await getAuthSession()
    if (!session) {
      return new Response("Unauthorized", { status: 401 })
    }

    const geometries = await db.coordinateCandidate.findMany({
      where: {
        locationMCId: query.idLocation,
      },
      include: {
        votes: true,
      },
    })

    if (geometries.length === 0) {
      return new Response("No geometries found", { status: 404 })
    }

    if (query.type === "highestVote") {
      const highestVotedCoordinateCandidate = geometries.reduce(
        (highestVotedCoordinateCandidate, coordinateCandidate) => {
          if (
            coordinateCandidate.votes.length >
            highestVotedCoordinateCandidate.votes.length
          ) {
            return coordinateCandidate
          } else {
            return highestVotedCoordinateCandidate
          }
        },
        { votes: [] } // Initialize with an empty object in case there are no candidates
      )

      const { coordinateCandidateId, lat, lon, locationName } =
        highestVotedCoordinateCandidate

      const coordinateCandidate = {
        name: locationName,
        place_id: coordinateCandidateId,
        geometries: {
          lat: lat,
          lon: lon,
        },
      }

      return new Response(JSON.stringify(coordinateCandidate), {
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(geometries), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error(error)
    return new Response("Unable to retrieve users", { status: 500 })
  }
}
