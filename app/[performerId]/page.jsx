"use client"

import { Suspense } from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"

import { GetCoordinates, GetInfoPerson, GetLocations } from "../api/musiconn"

async function Coordinates({ eventUid }) {
  const { event } = await GetLocations(eventUid)

  // make a string of unique locationUids
  const locationUid = [
    ...new Set(
      Object.values(event)
        .flatMap((obj) => obj.locations)
        .filter(
          (locationObj) => locationObj && locationObj.location !== undefined
        ) // Check if locationObj exists before accessing its location property
        .map((locationObj) => locationObj.location)
    ),
  ].join("|")
  console.log("locationUid", locationUid)

  // make an array of objects with eventId and locationId
  const eventLocations = []
  Object.keys(event).forEach((eventId) => {
    const locations = event[eventId].locations
    if (locations && locations.length > 0) {
      locations
        .filter(
          (locationObj) => locationObj && locationObj.location !== undefined
        )
        .forEach((locationObj) => {
          eventLocations.push({
            eventId: parseInt(eventId),
            locationId: locationObj.location,
          })
        })
    } else {
      eventLocations.push({
        eventId: parseInt(eventId),
        locationId: 0,
      })
    }
  })
  console.log("eventLocations", eventLocations)

  // GET COORDINATES
  const data = await GetCoordinates(locationUid)
  console.log("data GetCoordinates", data)

  const nameLocations = Object.keys(data.location).map((locationId) => {
    const location = data.location[locationId]
    const title = location.title
    const coordinates = location.geometries?.[0]?.geo || null

    return {
      [locationId]: {
        locationId,
        title,
        coordinates,
      },
    }
  })

  console.log("nameLocations", nameLocations)

  const mergedLocations = eventLocations.map((eventLocation) => {
    const locationId = eventLocation.locationId
    const locationInfo = data.location[locationId]
    const title = locationInfo ? locationInfo.title : null
    const coordinates =
      locationInfo &&
      locationInfo.geometries &&
      locationInfo.geometries[0] &&
      locationInfo.geometries[0].geo
        ? locationInfo.geometries[0].geo
        : null
    const eventId = eventLocation.eventId

    return {
      locationId,
      title,
      coordinates,
      eventId,
    }
  })
  console.log("mergedLocations", mergedLocations)

  return (
    <div>
      {mergedLocations.map((location) => (
        <Card key={`${location.eventId}-${location.locationId}`}>
          <CardHeader>
          <Badge variant="secondary">eventId: {location.eventId}</Badge>
          <Badge variant="secondary">title: {location.title}, locationId: {location.locationId}</Badge>
          <Badge variant={location.coordinates ? "secondary" : "destructive"}>
            coordinates:{" "}
            {location.coordinates
              ? `${location.coordinates[0]}, ${location.coordinates[1]}`
              : "null"}
          </Badge>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}

export default async function Composer({ params }) {
  const { performerId } = params
  const data = await GetInfoPerson(performerId)
  const id = data[performerId]
  // const eventsJoin = event.join("|");
  const eventsNumbers = [...new Set(id.events.map((event) => event.event))]
  const eventsJoin = eventsNumbers.join("|")
  return (
    <section className="mt-20 mx-56">
      <h1>{performerId}</h1>
      <h1 className="md:font-black md:text-4xl">{id.title}</h1>
      <div className="grid grid-cols-3">
        {" "}
        <Suspense
          fallback={<Badge variant={"secondary"}>loading coordinates...</Badge>}
        >
          <Coordinates eventUid={eventsJoin}></Coordinates>
        </Suspense>
      </div>
    </section>
  )
}
