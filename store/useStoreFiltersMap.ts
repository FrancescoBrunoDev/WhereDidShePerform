import { create } from "zustand"

export const useStoreFiltersMap = create((set) => ({
  locationsData: [],
  filteredLocationsData: [],
  filteredLocationsDataViewMap: [],
  activeCountries: [],
  filteredDataCountry: [],
  activeContinents: [],
  filteredDataContinent: [],
  areAllFiltersDeactivated: false,
  selectedComposerNames: [],
  expandedLocations: false,
  locationsWithComposer: [],
  categoryFilters: {
    Season: {
      state: true,
      id: 1,
    },
    Concerts: {
      state: true,
      id: 2,
    },
    Religious_Event: {
      state: true,
      id: 3,
    },
    Music_Theater: {
      state: true,
      id: 4,
    },
  },
  categoryFiltersActive: {},

  setFiltersFirstStart: (filteredDataCountry: [], filteredDataContinent: []) =>
    set({ filteredDataCountry, filteredDataContinent }),
  setlocationsWithComposer: (locationsWithComposer: []) =>
    set({ locationsWithComposer }),
  setLocationsData: (locationsData: []) => set({ locationsData }),
  setExpandedLocations: (expandedLocations: boolean) =>
    set({ expandedLocations }),
  setFilteredLocationsDataStart: (locationsData: []) =>
    set({ filteredLocationsData: locationsData }),

  setFilteredLocationsData: () =>
    set((state: { locationsData: any[]; categoryFiltersActive: {} }) => {
      const locationsData = state.locationsData
      const categoryFiltersActive = state.categoryFiltersActive

      const filteredData = locationsData
        .map((city) => {
          const { locations, count: totalCount } = city
          const filteredLocations = locations.reduce(
            (filtered: any[], location: { eventInfo: any[] }) => {
              const filteredEventInfo = location.eventInfo.filter((event) =>
                Object.values(categoryFiltersActive).some(
                  (category) =>
                    (category as { state: boolean; id: number }).state &&
                    event.eventCategory ===
                      (category as { state: boolean; id: number }).id
                )
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
            },
            []
          )

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

      return { filteredLocationsData: filteredData }
    }),
  setFilteredLocationsDataViewMap: (
    filteredLocationsData: [],
    isEuropeMap: boolean
  ) => {
    const filteredLocationsDataViewMap = isEuropeMap
      ? filteredLocationsData.filter(
          (location: any) => location.continent === "EU"
        )
      : filteredLocationsData

    set({ filteredLocationsDataViewMap })
  },
  setActiveCountries: (country: any) => {
    set((state: { activeCountries: any[]; filteredDataContinent: any[] }) => {
      const updatedActiveCountries = state.activeCountries.includes(country)
        ? state.activeCountries.filter((c) => c !== country)
        : [...state.activeCountries, country]

      const updatedFilteredDataCountry = state.filteredDataContinent.filter(
        (location) => !updatedActiveCountries.includes(location.country)
      )

      return {
        activeCountries: updatedActiveCountries,
        filteredDataCountry: updatedFilteredDataCountry,
      }
    })
  },

  setActiveContinents: (continent: any) => {
    set(
      (state: {
        activeContinents: any[]
        filteredLocationsData: any[]
        locationsData: any[]
      }) => {
        const updatedActiveContinents = state.activeContinents.includes(
          continent
        )
          ? state.activeContinents.filter((c) => c !== continent)
          : [...state.activeContinents, continent]

        const updatedFilteredDataContinent = state.filteredLocationsData
          ? state.filteredLocationsData.filter(
              (location) =>
                !updatedActiveContinents.includes(location.continent)
            )
          : state.locationsData.filter(
              (location) =>
                !updatedActiveContinents.includes(location.continent)
            )

        return {
          activeContinents: updatedActiveContinents,
          filteredDataContinent: updatedFilteredDataContinent,
          locationsData: state.locationsData,
        }
      }
    )
  },
  setAreAllFiltersDeactivated: (areAllFiltersDeactivated: boolean) =>
    set({ areAllFiltersDeactivated }),
  setSelectedComposerNames: (name: any, checked: boolean) => {
    set((state: { selectedComposerNames: any[] }) => {
      if (checked) {
        return {
          selectedComposerNames: [...state.selectedComposerNames, name],
        }
      } else {
        const updatedSelectedComposerNames = state.selectedComposerNames.filter(
          (n) => n !== name
        )
        return {
          selectedComposerNames: updatedSelectedComposerNames,
        }
      }
    })
  },
  resetSelectedComposerNames: () => set({ selectedComposerNames: [] }),
  setCategoryFilters: (category: any) => {
    set((state: { categoryFilters: any; categoryFiltersActive: any }) => {
      const currentFilterValue = state.categoryFiltersActive[category].state
      const updatedFilterValue = !currentFilterValue

      return {
        categoryFiltersActive: {
          ...state.categoryFiltersActive,
          [category]: {
            ...state.categoryFiltersActive[category],
            state: updatedFilterValue,
          },
        },
      }
    })
  },
  isCategoryAvailable: () => {
    set((state: { locationsData: any[]; categoryFilters: any }) => {
      const locationsData = state.locationsData
      let categoryFilters = state.categoryFilters

      Object.keys(categoryFilters).forEach((category) => {
        const id = categoryFilters[category].id
        const isCategoryAvailable = locationsData.some((city) =>
          city.locations.some((location: { eventInfo: any[] }) =>
            location.eventInfo.some((event) => event.eventCategory === id)
          )
        )

        if (!isCategoryAvailable) {
          delete categoryFilters[category]
        }
      })

      return {
        categoryFiltersActive: { ...categoryFilters },
      }
    })
  },
}))
