import { Suspense, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { GetCoordinates } from "@/app/api/musiconn"

async function Coordinates({ locationUid }) {
  // Wait for the the locationUid
  const data = await GetCoordinates(locationUid)
  const geometries = data.location[locationUid].geometries
  let content = null

  if (geometries && geometries.length > 0) {
    const [lat, lng] = geometries[0].geo
    content = (
      <Badge variant="secondary">
        Coordinates: {lat}, {lng}
      </Badge>
    )
  } else {
    content = <Badge variant="destructive">no coordinates found</Badge>
  }

  return <div>{content}</div>
}

export default function PerformanceSearchResults({ results }) {
  console.log(results)
  if (!results || results.length === 0 || !results[0].location) {
    return <p>No results found.</p>
  }

  const content = Object.keys(results[0].location).map((locationId) => {
    const location = results[0].location[locationId]
    const badges =
      location.parents &&
      Object.keys(location.parents).map((parentsId) => {
        const parents = location.parents[parentsId]
        const categoryLabel = parents.location.categories[0].label

        if (categoryLabel === 5) {
          return (
            <div>
              <Badge key={parents.location.uid}>{parents.location.title}</Badge>
              <Suspense
                fallback={
                  <Badge key={`loading-${parents.location.uid}`} variant={"secondary"}>
                    loading coordinates...
                  </Badge>
                }
              >
                <Coordinates locationUid={parents.location.uid}></Coordinates>
              </Suspense>
            </div>
          )
        } else if (categoryLabel === 4) {
          return (
            <Badge
              id="badgeRegion"
              key={parents.location.uid}
              variant="secondary"
            >
              Region {parents.location.title}
            </Badge>
          )
        } else {
          const regex = /\((.*?)\)/
          const match = location.title.match(regex)

          if (match) {
            return (
              <Badge key={location.uid} variant="secondary">
                extracted {match[1]}
              </Badge>
            )
          } else {
            return null
          }
        }
      })

    return (
      <Card key={location.uid}>
        <CardHeader>{location.title}</CardHeader>
        <CardFooter>
          {badges}
          <Badge variant="secondary">{location.uid}</Badge>
        </CardFooter>
      </Card>
    )
  })

  return <div className="my-10">{content}</div>
}
