import { create } from "zustand"

interface Location {
  locationId: number
  title: string
  coordinates: [number, number]
  eventInfo: EventInfo[]
  categories: { label: number }[]
  count: number
}

interface EventInfo {
  eventId: number
  date: string
  eventCategory: number
  eventTitle: string
}

interface City {
  key: number
  city: string
  count: number
  countLocations: number
  locations: Location[]
  coordinates: [number, number]
  country: string
  coordinatesCountry: [number, number]
  continent: string
}

interface CategoryFilter {
  state: boolean
  id: number
}

interface Filters {
  locationsData: City[]
  activeCountries: string[]
  activeContinents: string[]
  areAllFiltersDeactivated: boolean
  selectedComposerNames: string[]
  expandedLocations: boolean
  locationsWithComposer: any[] // Update the type of this property accordingly
  categoryFilters: {
    Season: CategoryFilter
    Concerts: CategoryFilter
    Religious_Event: CategoryFilter
    Music_Theater: CategoryFilter
    // Add more categories if needed
  }
  categoryFiltersActive: Record<string, boolean>
  highestYear: number | null
  lowestYear: number | null
  filterHighestYear: number | null
}

export const useStoreFiltersMap = create<Filters>()((set) => ({
  locationsData: [],
  activeCountries: [],
  activeContinents: [],
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
  highestYear: null,
  lowestYear: null,
  filterHighestYear: null,

  setlocationsWithComposer: (locationsWithComposer: []) =>
    set({ locationsWithComposer }),
  setLocationsData: (locationsData: []) => set({ locationsData }),
  setExpandedLocations: (expandedLocations: boolean) =>
    set({ expandedLocations }),

  setActiveCountries: (country: any) => {
    set((state: { activeCountries: any[] }) => {
      const updatedActiveCountries = state.activeCountries.includes(country)
        ? state.activeCountries.filter((c) => c !== country)
        : [...state.activeCountries, country]

      return {
        activeCountries: updatedActiveCountries,
      }
    })
  },

  setActiveContinents: (continent: any) => {
    set((state: { activeContinents: any[] }) => {
      const updatedActiveContinents = state.activeContinents.includes(continent)
        ? state.activeContinents.filter((c) => c !== continent)
        : [...state.activeContinents, continent]

      return {
        activeContinents: updatedActiveContinents,
      }
    })
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
  findHigestYear: () => {
    set((state: Filters) => {
      let highestYear: number | null = null
      let lowestYear: number | null = null

      const locationsData: City[] = state.locationsData
      if (locationsData.length > 0) {
        locationsData.forEach(({ locations }) => {
          if (locations) {
            locations.forEach(({ eventInfo }) => {
              if (eventInfo) {
                eventInfo.forEach(({ date }) => {
                  const year = Number(date.substr(0, 4))

                  if (highestYear === null || year > highestYear) {
                    highestYear = year
                  }

                  if (lowestYear === null || year < lowestYear) {
                    lowestYear = year
                  }
                })
              }
            })
          }
        })
      }
      return {
        highestYear,
        lowestYear,
        filterHighestYear: highestYear,
      }
    })
  },
  updateFilterHighestYear: (filterHighestYear: number | null) =>
    set({ filterHighestYear }),
}))
