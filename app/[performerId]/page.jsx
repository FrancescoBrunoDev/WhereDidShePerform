"use client"

import { Suspense } from "react"

import { Badge } from "@/components/ui/badge"

import { GetCoordinates, GetInfoPerson, GetLocations } from "../api/musiconn"

async function Coordinates({ eventUid }) {
  const location = await GetLocations(eventUid)
  const locationUid = location.event[eventUid].locations[0].location
  // Wait for the the locationUid

  const data = await GetCoordinates(locationUid)
  const geometries = data.location[locationUid].geometries

  let content = null

  if (geometries && geometries.length > 0) {
    // The geometries array exists and has at least one element
    const [lat, lng] = geometries[0].geo
    content = (
      <Badge key={locationUid} variant="secondary">
        Coordinates: {lat}, {lng}
      </Badge>
    )
  } else if (geometries && geometries.length === 0) {
    // The geometries array exists but is empty
    content = (
      <Badge key={locationUid} variant="destructive">
        no coordinates found
      </Badge>
    )
  } else {
    // The geometries array is undefined
    content = (
      <Badge key={locationUid} variant="destructive">
        error: geometries not found
      </Badge>
    )
  }

  return <div>{content}</div>
}

export default async function Composer({ params }) {
  const { performerId } = params
  const data = await GetInfoPerson(performerId)
  const id = data[performerId]
  console.log(id)
  const eventsCounter = id.events.map((event) => {
    const events = event
    return (
      <div key={events.event}>
        <Badge variant="secondary">{events.event}</Badge>
        <Suspense
          fallback={
            <Badge
              variant={"secondary"}
            >
              loading coordinates...
            </Badge>
          }
        >
          <Coordinates eventUid={events.event}>{events.event}</Coordinates>
        </Suspense>
      </div>
    )
  })
  return (
    <section className="mt-20 mx-56">
      <h1>{performerId}</h1>
      <h1 className="md:font-black md:text-4xl">{id.title}</h1>
      <div>{eventsCounter}</div>
    </section>
  )
}
