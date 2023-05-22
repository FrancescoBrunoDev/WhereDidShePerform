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
  locationsData,
  setFilteredLocationsData,
  selectedComposerNames,
  locationsWithComposer,
  filterLowestYear,
  filterHighestYear
) {
  let filteredData = locationsData

  filteredData = getEventFilteredByTimeLine(
    locationsData,
    filterLowestYear,
    filterHighestYear
  )

  if (expandedLocations) {
    filteredData = locationsWithComposer
  }

  filteredData = filteredData
    .map((city) => {
      const { locations, count: totalCount } = city
      const filteredLocations = locations.reduce((filtered, location) => {
        const filteredEventInfo = location.eventInfo.filter(
          (event) =>
            (concerts || event.eventCategory !== 2) &&
            (musicTheater || event.eventCategory !== 4) &&
            (religiousEvent || event.eventCategory !== 3) &&
            (season || event.eventCategory !== 1)
        )

        const count = filteredEventInfo.length

        if (count > 0) {
          const updatedLocation = {
            ...location,
            eventInfo: filteredEventInfo,
            count,
          }
          filtered.push(updatedLocation)
        }

        return filtered
      }, [])

      if (filteredLocations.length > 0) {
        return {
          ...city,
          locations: filteredLocations,
          count: totalCount,
          countLocations: filteredLocations.length,
        }
      }

      return null
    })
    .filter((city) => city)

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

export function getEventsByComposerSearch(
  selectedComposerNames,
  filteredDataFilteredByCategory
) {
  const filteredData = filteredDataFilteredByCategory
    .map((city) => {
      const { locations, count: totalCount } = city
      const filteredLocations = locations.reduce((filtered, location) => {
        const filteredEventInfo = location.eventInfo.filter((event) => {
          const composerNamesArray = event?.composerNamesArray
          if (composerNamesArray) {
            const hasAllSelectedNames = selectedComposerNames.every(
              (selectedName) =>
                composerNamesArray.some(
                  (composer) => composer.title === selectedName
                )
            )

            return hasAllSelectedNames
          }
          return true
        })

        const count = filteredEventInfo.length

        if (count > 0) {
          const updatedLocation = {
            ...location,
            eventInfo: filteredEventInfo,
            count,
          }
          filtered.push(updatedLocation)
        }

        return filtered
      }, [])

      if (filteredLocations.length > 0) {
        return {
          ...city,
          locations: filteredLocations,
          count: totalCount,
          countLocations: filteredLocations.length,
        }
      }

      return null
    })
    .filter((city) => city)

  return filteredData
}

export function getEventFilteredByTimeLine(
  locationsData,
  filterLowestYear,
  filterHighestYear
) {
  const filteredData = locationsData
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
          .filter((location) => location.eventInfo.length > 0)

        if (filteredLocations.length > 0) {
          return {
            ...city,
            locations: filteredLocations,
          }
        }
      }

      return null
    })
    .filter((city) => city)

  return filteredData
}

export function getAvailableComposers(locationsData) {
  const composerSet = new Set()

  locationsData.forEach((city) => {
    city.locations.forEach((location) => {
      location.eventInfo.forEach((event) => {
        event.composerNamesArray?.forEach((composer) => {
          composerSet.add(composer.title)
        })
      })
    })
  })

  return Array.from(composerSet).map((title) => ({ title }))
}
