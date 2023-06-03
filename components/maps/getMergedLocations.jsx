import {
  GetCoordinates,
  GetLocations,
  GetNameComposer,
  GetPerformances,
} from "@/app/api/musiconn"

export async function GetListOfEvent(id, usePerformances = false) {
  let event = {}
  const eventsNumbers = id.events.map((event) => event.event)
  if (eventsNumbers.length > 500) {
    const chunkSize = 500
    const chunks = []

    for (let i = 0; i < eventsNumbers.length; i += chunkSize) {
      const chunk = eventsNumbers.slice(i, i + chunkSize)
      chunks.push(chunk)
    }

    const eventPromises = chunks.map((chunk) =>
      usePerformances
        ? GetPerformances(chunk.join("|"))
        : GetLocations(chunk.join("|"))
    )

    const chunkEvents = await Promise.all(eventPromises)

    event = chunkEvents.reduce((mergedEvent, chunkEvent) => {
      Object.assign(mergedEvent, chunkEvent.event) // Use Object.assign() to merge objects efficiently
      return mergedEvent
    }, {})
  } else {
    const result = await (usePerformances
      ? GetPerformances(eventsNumbers.join("|"))
      : GetLocations(eventsNumbers.join("|")))
    event = result.event
  }

  return event
}

export async function GetExpandedEventWithPerformances(id, locationsData) {
  const event = await GetListOfEvent(id, true)

  const expandedLocationsPerformance = locationsData.map((location) => {
    return {
      ...location,
      locations: location.locations.map((locationObj) => {
        return {
          ...locationObj,
          eventInfo: locationObj.eventInfo.map((eventInfo) => {
            const uid = event[eventInfo.eventId]
            return {
              ...eventInfo,
              eventData: uid,
            }
          }),
        }
      }),
    }
  })

  let composerNumbers = []

  expandedLocationsPerformance.forEach((location) => {
    location.locations.forEach((locationObj) => {
      locationObj.eventInfo.forEach((eventInfo) => {
        for (const performance of eventInfo.eventData.performances || []) {
          for (const composer of performance.composers || []) {
            if (composer.person) {
              composerNumbers.push(composer.person)
            }
          }
        }
      })
    })
  })

  const composerNumbersSet = new Set(composerNumbers)
  const composerNumbersString = Array.from(composerNumbersSet).join("|")
  const composerNames = await GetNameComposer(composerNumbersString)

  expandedLocationsPerformance.forEach((location) => {
    location.locations.forEach((locationObj) => {
      locationObj.eventInfo.forEach((eventInfo) => {
        const composerNamesSet = new Set()

        eventInfo.eventData.performances?.forEach((performance) => {
          performance.composers?.forEach((composer) => {
            if (composer.person) {
              const composerName = composerNames[composer.person]
              composer.person = {
                id: composer.person,
                name: composerName,
              }
              composerNamesSet.add(composerName)
            }
          })

          eventInfo.composerNamesArray = Array.from(composerNamesSet)
          eventInfo.composerNamesString =
            eventInfo.composerNamesArray.join(", ")
        })
      })
    })
  })

  return expandedLocationsPerformance
}

export async function GetLocationsWithEventsAndTitle(id) {
  // get event
  const event = await GetListOfEvent(id)

  if (!event) {
    const locationUid = []
    return locationUid
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
    const categories = event[eventId]?.categories[0]?.label ?? null
    const locations = event[eventId].locations
    const date = event[eventId]?.dates[0]?.date ?? null
    const title = event[eventId]?.title ?? null
    if (locations && locations.length > 0) {
      locations
        .filter(
          (locationObj) => locationObj && locationObj.location !== undefined
        )
        .forEach((locationObj) => {
          const locationId = locationObj.location
          const eventLocation = {
            eventId: parseInt(eventId),
            locationId,
            date,
            categories,
            title,
          }
          eventLocations.push(eventLocation)
        })
    } else {
      const eventLocation = {
        eventId: parseInt(eventId),
        locationId: 0,
        date,
        categories,
        title,
      }
      eventLocations.push(eventLocation)
    }
  })

  // GET COORDINATES
  const data = await GetCoordinates(locationUid)
  // Create a map to store location data with associated event IDs and dates
  const locationMap = {}
  for (const eventLocation of eventLocations) {
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
    const eventCategory = eventLocation.categories
    const eventTitle = eventLocation.title

    if (title && coordinates) {
      if (!locationMap[locationId]) {
        locationMap[locationId] = {
          locationId,
          title,
          coordinates: [coordinates[1], coordinates[0]],
          eventInfo: [],
          categories: categories || [],
        }
      }
      if (eventId) {
        locationMap[locationId].eventInfo.push({
          eventId,
          date,
          eventCategory,
          eventTitle,
        })
      } else {
        locationMap[locationId].eventInfo.push({
          eventId: null,
          date,
          eventCategory,
          eventTitle,
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

  // organise by city
  const titlesWithSameCity = {}
  const locationsWithSameCity = []
  let key = 1
  const coordinatePairs = []

  for (const location of locationsWithCount) {
    const { coordinates } = location
    coordinatePairs.push(`${coordinates[1]},${coordinates[0]}`)
  }

  const batchSize = 100 // Define the size of each batch
  const batchedCoordinatePairs = []
  let currentBatch = []

  for (let i = 0; i < coordinatePairs.length; i++) {
    currentBatch.push(coordinatePairs[i])

    if (currentBatch.length === batchSize || i === coordinatePairs.length - 1) {
      batchedCoordinatePairs.push(currentBatch.join("|"))
      currentBatch = []
    }
  }

  for (const batch of batchedCoordinatePairs) {
    const cityData = await getCityNameFromCoordinatesAPI(batch)
    
    for (let i = 0; i < cityData.length; i++) {
      const cityName = cityData[i]
      const location = locationsWithCount[i]

      if (!titlesWithSameCity[cityName.name]) {
        titlesWithSameCity[cityName.name] = {
          count: 0, // Updated property name to count
          locations: [],
          coordinates: [cityName.longitude, cityName.latitude],
          country: cityName.country?.name,
          continent: cityName.country?.continent,
        }
      }

      titlesWithSameCity[cityName.name].locations.push(location)
      titlesWithSameCity[cityName.name].count += location.count // Updated property name to count
      titlesWithSameCity[cityName.name].coordinates = [
        cityName.longitude,
        cityName.latitude,
      ]
      titlesWithSameCity[cityName.name].country = cityName.country?.name
      titlesWithSameCity[cityName.name].continent = cityName.country?.continent
      key++
    }
  }

  for (const city in titlesWithSameCity) {
    const { count, locations, coordinates, country, continent } =
      titlesWithSameCity[city]
    const countLocations = locations.length
    locationsWithSameCity.push({
      key,
      city,
      count, // Updated property name to count
      countLocations,
      locations,
      coordinates: coordinates,
      country,
      continent,
    })
    key++
  }

  // Now you can use the `locationsWithSameCity` array in your user interface as needed.
  return locationsWithSameCity
}

async function getCityNameFromCoordinatesAPI(coordinatePairs) {
  const res = await fetch(`/api/getCountryName/getLargerCityByCoordinates?coordinates=${coordinatePairs}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
