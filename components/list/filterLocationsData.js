import { GetExpandedEventWithPerformances } from "@/components/maps/getMergedLocations"

export function checkCategoryAvailability(locationsData, category) {
  const isCategoryAvailable = locationsData.some((city) =>
    city.locations.some((location) =>
      location.eventInfo.some((event) => event.eventCategory === category)
    )
  )

  return isCategoryAvailable
}

export async function filterLocationsData(
  expandedLocations,
  concerts,
  musicTheater,
  religiousEvent,
  season,
  id,
  filteredLocationsDataTimeLine,
  setFilteredLocationsData
) {
  let filteredData = filteredLocationsDataTimeLine

  if (expandedLocations) {
    filteredData = await GetExpandedEventWithPerformances(id, filteredData)
  }

  filteredData = filteredData
    .map((city) => {
      let totalCount = 0
      const filteredLocations = city.locations
        .map((location) => {
          const filteredEventInfo = location.eventInfo.filter(
            (event) =>
              (concerts || event.eventCategory !== 2) &&
              (musicTheater || event.eventCategory !== 4) &&
              (religiousEvent || event.eventCategory !== 3) &&
              (season || event.eventCategory !== 1)
          )

          const count = filteredEventInfo.length
          totalCount += count

          return {
            ...location,
            eventInfo: filteredEventInfo,
            count: count,
          }
        })
        .filter((location) => location.count > 0)

      return {
        ...city,
        locations: filteredLocations,
        count: totalCount,
        countLocations: filteredLocations.length,
      }
    })
    .filter((city) => city.countLocations > 0)

  setFilteredLocationsData(filteredData)
}

export function getAvailableComposers(locationsData) {
  const composerMap = new Map()

  locationsData.forEach((city) => {
    city.locations.forEach((location) => {
      location.eventInfo.forEach((event) => {
        event.composerNamesArray?.forEach((composer)=>{
          composerMap.set(composer, {
            id: composer,
            name: {
              title: composer,
            },
          })
        })
        
      })
    })
  })

  return Array.from(composerMap.values())
}
