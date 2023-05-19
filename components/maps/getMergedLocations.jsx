import { GetCoordinates, GetLocations } from "@/app/api/musiconn"

export async function GetLocationsWithEventsAndTitle(id) {
  let event = {}
  const eventsNumbers = id.events.map((event) => event.event)
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
    const result = await GetLocations(eventsNumbers.join("|"))
    event = result.event
  }

  // console.log(event, "event")

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
    const date = event[eventId]?.dates[0]?.date ?? null
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
    const parents = data.location[eventLocation.locationId]?.parents
    const categories = data.location[eventLocation.locationId]?.categories
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
          parents: parents || [],
          categories: categories || [],
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

  const titlesWithSameCity = {}
  const locationsWithSameCity = []
  let key = 1

  for (const location of locationsWithCount) {
    const { title, coordinates } = location
    const match = title.match(/\((.*?)\)/) // Find text within parentheses

    if (match && match[1]) {
      const city = match[1]

      if (!titlesWithSameCity[city]) {
        titlesWithSameCity[city] = {
          count: 0, // Updated property name to count
          locations: [],
          coordinates: [0, 0],
        }
      }

      titlesWithSameCity[city].locations.push(location)
      titlesWithSameCity[city].count += location.count // Updated property name to count
      titlesWithSameCity[city].coordinates[0] += coordinates[0]
      titlesWithSameCity[city].coordinates[1] += coordinates[1]
    } else {
      // Handle locations without a city match
      const newCity = location.title

      if (!titlesWithSameCity[newCity]) {
        titlesWithSameCity[newCity] = {
          count: 0, // Updated property name to count
          locations: [],
          coordinates: [0, 0],
        }
      }

      titlesWithSameCity[newCity].locations.push(location)
      titlesWithSameCity[newCity].count += location.count // Updated property name to count
      titlesWithSameCity[newCity].coordinates[0] += coordinates[0]
      titlesWithSameCity[newCity].coordinates[1] += coordinates[1]

      key++
    }
  }

  for (const city in titlesWithSameCity) {
    const { count, locations, coordinates } = titlesWithSameCity[city]
    const countLocations = locations.length
    const averageCoordinates = [
      coordinates[0] / countLocations,
      coordinates[1] / countLocations,
    ]
    locationsWithSameCity.push({
      key,
      city,
      count, // Updated property name to count
      countLocations,
      locations,
      coordinates: averageCoordinates,
    })
    key++
  }
  console.log(locationsWithSameCity, "locationsWithSameCity")
  return locationsWithSameCity
}
