import { GetCoordinates, GetLocations, GetTitle } from "@/app/api/musiconn"

export async function GetMergedLocations(id) {
  const eventsNumbers = [...new Set(id.events.map((event) => event.event))]
  const eventsJoin = eventsNumbers.join("|")
  const { event } = await GetLocations(eventsJoin)

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

  // GET COORDINATES
  const data = await GetCoordinates(locationUid)

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

  return mergedLocations
}

export async function GetLocationsWithEventCount(id) {
  const mergedLocations = await GetMergedLocations(id)

  // Create a map to store location data with associated event IDs
  const locationMap = {}
  for (const location of mergedLocations) {
    const { locationId, title, coordinates, eventId } = location
    if (title && coordinates) {
      if (!locationMap[locationId]) {
        locationMap[locationId] = {
          locationId,
          title,
          coordinates: [coordinates[1], coordinates[0]],
          eventIds: [],
        }
      }
      if (eventId) {
        locationMap[locationId].eventIds.push(eventId)
      }
    }
  }

  // Convert the map to an array of locations with event counts
  const locationsWithCount = Object.values(locationMap).map((location) => {
    return {
      ...location,
      count: location.eventIds.length,
      eventIds: location.eventIds,
    }
  })

  return locationsWithCount
}

export async function GetTitleEvents(eventIds) {
  const eventsJoin = eventIds.countId.join("|")
  const mergedEvents = await GetTitle(eventsJoin)
  return mergedEvents
}