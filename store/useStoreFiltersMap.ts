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

  setFiltersFirstStart: (filteredDataCountry: [], filteredDataContinent: []) =>
    set({ filteredDataCountry, filteredDataContinent }),

  setLocationsData: (locationsData: []) => set({ locationsData }),
  setFilteredLocationsData: (filteredLocationsData: []) =>
    set({ filteredLocationsData }),
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
}))
