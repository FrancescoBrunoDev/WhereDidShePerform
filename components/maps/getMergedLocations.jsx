import { GetCoordinates, GetLocations } from "@/app/api/musiconn"

export async function GetLocationsWithEventsAndTitle(performerId) {
  let event = {}
  const eventsNumbers = performerId.events.map((event) => event.event)
  if (eventsNumbers.length > 500) {
    const chunkSize = 500
    const chunks = []

    for (let i = 0; i < eventsNumbers.length; i += chunkSize) {
      const chunk = eventsNumbers.slice(i, i + chunkSize)
      chunks.push(chunk)
    }
    const eventPromises = chunks.map((chunk) => GetLocations(chunk.join("|")))
    const chunkEvents = await Promise.all(eventPromises)

    event = chunkEvents.reduce(
      (mergedEvent, chunkEvent) => ({
        ...mergedEvent,
        ...chunkEvent.event,
      }),
      {}
    )
  } else {
    event = await GetLocations(eventsNumbers.join("|"))
  }
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

  // make an array of objects with eventId and locationId
  const eventLocations = []
  Object.keys(event).forEach((eventId) => {
    const locations = event[eventId].locations
    const date = event[eventId]?.dates[0]?.date ?? null;
    if (locations && locations.length > 0) {
      locations
        .filter(
          (locationObj) => locationObj && locationObj.location !== undefined
        )
        .forEach((locationObj) => {
          eventLocations.push({
            eventId: parseInt(eventId),
            locationId: locationObj.location,
            date: date,
          })
        })
    } else {
      eventLocations.push({
        eventId: parseInt(eventId),
        locationId: 0,
        date: date,
      })
    }
  })

  // GET COORDINATES
  const data = await GetCoordinates(locationUid)

  // Create a map to store location data with associated event IDs and dates
  const locationMap = {}
  for (const eventLocation of eventLocations) {
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
    const date = eventLocation.date

    if (title && coordinates) {
      if (!locationMap[locationId]) {
        locationMap[locationId] = {
          locationId,
          title,
          coordinates: [coordinates[1], coordinates[0]],
          eventInfo: [],
        }
      }
      if (eventId) {
        locationMap[locationId].eventInfo.push({
          eventId,
          date,
        })
      } else {
        locationMap[locationId].eventInfo.push({
          eventId: null,
          date,
        })
      }
    }
  }

  // Convert the map to an array of locations with event counts and dates
  const locationsWithCount = Object.values(locationMap).map((location) => {
    return {
      ...location,
      count: location.eventInfo.length,
    }
  })

  return locationsWithCount
}
