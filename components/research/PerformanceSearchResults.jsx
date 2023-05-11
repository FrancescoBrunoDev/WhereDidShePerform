import { Suspense, useEffect } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { GetCoordinates } from "@/app/api/musiconn"

export default function PerformanceSearchResults({
  results,
  coordinates,
  setCoordinates,
}) {
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
            <Badge key={parents.location.uid}>{parents.location.title}</Badge>
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
                {match[1]}
              </Badge>
            )
          } else {
            return null
          }
        }
      })

    useEffect(() => {
      const fetchCoordinates = async () => {
        const locationUids = results.map((result) => result.location.uid)
        await Promise.all(
          locationUids.map(() =>
            GetCoordinates({
              uid: location.uid,
              setCoordinates: setCoordinates,
            })
          )
        )
      }

      fetchCoordinates()
    }, [results])

    return (
      <Card key={location.uid}>
        <CardHeader>{location.title}</CardHeader>
        <CardFooter>
          {badges}
          <Badge variant="secondary">{location.uid}</Badge>
          <Suspense fallback={<div>Loading...</div>}>
            {coordinates[location.uid] && (
              <Badge variant="secondary">
                Coordinates: {coordinates[location.uid].lat},{" "}
                {coordinates[location.uid].lng}
              </Badge>
            )}
          </Suspense>
        </CardFooter>
      </Card>
    )
  })

  return <div className="my-10">{content}</div>
}
