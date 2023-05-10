import { Suspense } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

import { GetCoordinates } from "../../app/api/musiconn"

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

      const uids = Object.keys(results[0].location).map(
        (locationId) => results[0].location[locationId].uid
      )
      console.log(uids)

    return (
      <Card key={location.uid}>
        <CardHeader>{location.title}</CardHeader>
        <CardFooter>
          {badges}
          <Badge variant="secondary">{location.uid}</Badge>
          <Suspense>
            <GetCoordinates uid={uids}>
              <Badge variant="secondary">Coordinates</Badge>
            </GetCoordinates>
          </Suspense>
        </CardFooter>
      </Card>
    )
  })

  return <div className="my-10">{content}</div>
}
