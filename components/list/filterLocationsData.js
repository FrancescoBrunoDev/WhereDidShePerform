import { GetExpandedEventWithPerformances } from "@/components/maps/getMergedLocations"

function filterEventInfoByCategory(locations, category) {
  return locations.map((location) => {
    const filteredEventInfo = location.eventInfo.filter(
      (event) => event.eventCategory !== category
    )

    return {
      ...location,
      eventInfo: filteredEventInfo,
      count: filteredEventInfo.length,
    }
  })
}

export function checkCategoryAvailability(locationsData, category) {
  const isCategoryAvailable = locationsData.some((city) =>
    city.locations.some((location) =>
      location.eventInfo.some((event) => event.eventCategory === category)
    )
  );

  return isCategoryAvailable;
}

export async function filterLocationsData(
  expandedLocations,
  concerts,
  musicTheater,
  religiousEvent,
  season,
  id,
  locationsData,
  setFilteredLocationsData
) {
  
  let filteredData = locationsData

  if (expandedLocations) {
    filteredData = await GetExpandedEventWithPerformances(id, filteredData)
  }

  if (!concerts) {
    filteredData = filteredData.map((city) => ({
      ...city,
      locations: filterEventInfoByCategory(city.locations, 2),
    }))
  }

  if (!musicTheater) {
    filteredData = filteredData.map((city) => ({
      ...city,
      locations: filterEventInfoByCategory(city.locations, 4),
    }))
  }

  if (!religiousEvent) {
    filteredData = filteredData.map((city) => ({
      ...city,
      locations: filterEventInfoByCategory(city.locations, 3),
    }))
  }

  if (!season) {
    filteredData = filteredData.map((city) => ({
      ...city,
      locations: filterEventInfoByCategory(city.locations, 1),
    }))
  }

  setFilteredLocationsData(filteredData)
}
