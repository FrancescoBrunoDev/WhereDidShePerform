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
  setFilteredLocationsData,
  selectedComposerNames
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

  // Apply composer filter
  let composerFilteredData = filteredData
  if (selectedComposerNames.length > 0) {
    composerFilteredData = getEventsByComposerSearch(
      selectedComposerNames,
      filteredData
    )
  }

  setFilteredLocationsData(composerFilteredData)
}

export function getAvailableComposers(locationsData) {
  const composerMap = new Map()

  locationsData.forEach((city) => {
    city.locations.forEach((location) => {
      location.eventInfo.forEach((event) => {
        event.composerNamesArray?.forEach((composer) => {
          composerMap.set(composer, {
            title: composer.title,
          })
        })
      })
    })
  })

  return Array.from(composerMap.values())
}

export function getEventsByComposerSearch(
  selectedComposerNames,
  filteredLocationsDataTimeLine
) {
  let filteredData = filteredLocationsDataTimeLine

  filteredData = filteredData
    .map((city) => {
      const filteredLocations = city.locations
        .map((location) => {
          const filteredEventInfo = location.eventInfo
            .map((event) => {
              const composerNamesArray = event?.composerNamesArray
              if (composerNamesArray) {
                const hasAllSelectedNames = selectedComposerNames.every(
                  (selectedName) =>
                    composerNamesArray.some(
                      (composer) => composer.title === selectedName
                    )
                )

                if (hasAllSelectedNames) {
                  return event
                }
                return null
              }
              return event
            })
            .filter(
              (event) =>
                event?.composerNamesArray && event.composerNamesArray.length > 0
            )

          return {
            ...location,
            eventInfo: filteredEventInfo,
          }
        })
        .filter((location) => location.eventInfo.length > 0)

      return {
        ...city,
        locations: filteredLocations,
      }
    })
    .filter((city) => city.locations.length > 0)

  return filteredData
}

export function getEventFilteredByTimeLine(
  locationsData,
  filterLowestYear,
  filterHighestYear
) {
  const filteredLocationsDataTimeLine = locationsData
    .map((city) => {
      if (city.locations) {
        const filteredLocations = city.locations
          .map((location) => {
            const filteredEventInfo = (location.eventInfo || []).filter(
              ({ date }) => {
                const year = Number(date.substr(0, 4))
                return year >= filterLowestYear && year <= filterHighestYear
              }
            )

            return {
              ...location,
              eventInfo: filteredEventInfo,
              count: filteredEventInfo.length,
            }
          })
          .filter((location) => {
            return location.eventInfo.length > 0
          })

        return {
          ...city,
          locations: filteredLocations,
        }
      }

      return city
    })
    .filter((city) => {
      return city.locations && city.locations.length > 0
    })
  return filteredLocationsDataTimeLine
}
