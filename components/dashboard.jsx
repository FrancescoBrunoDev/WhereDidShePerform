"use client"

import { useEffect, useState } from "react"
import { useStoreFiltersMap } from "@/store/useStoreFiltersMap"
import { useStoreSettingMap } from "@/store/useStoreSettingMap"
import { useViewportSize } from "@mantine/hooks"
import { format, parseISO } from "date-fns"
import { LayoutGroup, motion as m } from "framer-motion"

import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { filterLocationsData } from "@/components/list/filterLocationsData"
import List from "@/components/list/list"
import { GetExpandedEventWithPerformances } from "@/components/maps/getExpandedLocations"
import MapVisualizer from "@/components/maps/mapVisualizer"
import { GetInfoPerson } from "@/app/api/musiconn"

export default function Dashboard({ params }) {
  const [locationsData, setLocationsData] = useStoreFiltersMap((state) => [
    state.locationsData,
    state.setLocationsData,
  ])

  const [id, setId] = useState(null)
  const { timeFrame } = params
  const [searchData, setSearchData] = useState(timeFrame !== undefined)
  let startDate, endDate, formattedStartDate, formattedEndDate

  if (timeFrame !== undefined) {
    const [startDateString, endDateString] = timeFrame.split("%7C")
    startDate = parseISO(startDateString)
    endDate = parseISO(endDateString)
    formattedStartDate = format(startDate, "do MMM, yyyy")
    formattedEndDate = format(endDate, "do MMM, yyyy")
  }

  const expandedLocations = useStoreFiltersMap(
    (state) => state.expandedLocations
  ) // Track if the composer is expanded
  const categoryFiltersActive = useStoreFiltersMap(
    (state) => state.categoryFiltersActive
  )

  const [filteredLocationsData, setFilteredLocationsDataStart, setFilteredLocationsData] =
    useStoreFiltersMap((state) => [
      state.filteredLocationsData,
      state.setFilteredLocationsDataStart,
      state.setFilteredLocationsData,
    ])

  const [locationsWithComposer, setlocationsWithComposer] = useStoreFiltersMap(
    (state) => [state.locationsWithComposer, state.setlocationsWithComposer]
  )

  const { width } = useViewportSize()
  // filter from list

  // zustand state
  const selectedComposerNames = useStoreFiltersMap(
    (state) => state.selectedComposerNames
  )

  const setFilteredLocationsDataViewMap = useStoreFiltersMap(
    (state) => state.setFilteredLocationsDataViewMap
  )
  const isEuropeMap = useStoreSettingMap((state) => state.isEuropeMap)

  const setFiltersFirstStart = useStoreFiltersMap(
    (state) => state.setFiltersFirstStart
  )

  useEffect(() => {
    const handleFilterChange = () => {
      setFilteredLocationsDataStart(locationsData)
      setFilteredLocationsDataViewMap(filteredLocationsData, isEuropeMap)
      setFiltersFirstStart(locationsData, locationsData)
    }
    handleFilterChange()
  }, [locationsData, isEuropeMap])

  console.log(filteredLocationsData, "filteredLocationsData")
  // fetch data

  const { performerId } = params
  const { eventIds } = params
  const { userId } = params

  const searchId = performerId ? performerId : eventIds ? eventIds : userId
  const searchKind = performerId
    ? "performerId"
    : eventIds
    ? "eventIds"
    : "userId"

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `/api/getMergedLocations?${searchKind}=${searchId}`
      )

      if (!res.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await res.json()
      setLocationsData(data)
    }

    if (performerId || eventIds || userId) {
      fetchData()
    }
  }, [performerId, eventIds, userId, searchKind, searchId])

  useEffect(() => {
    async function getData() {
      const data = await GetInfoPerson(performerId)
      setId(data[performerId])
    }
    if (performerId) {
      getData()
    }
  }, [performerId, eventIds])

  let highestYear = null
  let lowestYear = null

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

  let filterLowestYear = lowestYear

  const [filterHighestYear, setFilterHighestYear] = useState(highestYear)

  useEffect(() => {
    setFilterHighestYear(highestYear)
  }, [highestYear])

  const updateFilterHighestYear = (newValue) => {
    setFilterHighestYear(newValue)
  }

  useEffect(() => {
    async function fetchData() {
      const locationsWithComposer = await GetExpandedEventWithPerformances(
        id,
        locationsData,
        eventIds
      )
      setlocationsWithComposer(locationsWithComposer)
    }

    if (expandedLocations) {
      fetchData()
    }
  }, [id, expandedLocations])

  useEffect(() => {
    filterLocationsData(
      expandedLocations,
      categoryFiltersActive,
      locationsData,
     setFilteredLocationsData, 
      selectedComposerNames,
      locationsWithComposer,
      filterLowestYear,
      filterHighestYear
    )
  }, [
    expandedLocations,
    categoryFiltersActive,
    locationsData,
   setFilteredLocationsData, 
    selectedComposerNames,
    locationsWithComposer,
    filterLowestYear,
    filterHighestYear,
  ]) 

  // filter list

  const { toast } = useToast()
  return (
    <m.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
    >
      <div className="container">
        {id && (
          <div className="fixed top-16 z-10 w-fit text-3xl font-black md:text-4xl lg:top-32 lg:w-96">
            <h1>{id.title}</h1>
          </div>
        )}
        {timeFrame && (
          <h1 className="fixed top-16 z-10 w-fit text-3xl font-black md:text-4xl lg:top-32 lg:w-96">
            From {formattedStartDate}
            <br />
            to {formattedEndDate}
          </h1>
        )}
      </div>
      <Tabs defaultValue="map">
        <div
          className={
            // It can't be done with tailwind because otherwise it makes the items in the list not clickable
            width < 1024
              ? "fixed bottom-10 z-20 flex w-full scale-125 justify-center"
              : "fixed top-16 z-20 flex w-full justify-center"
          }
        >
          <TabsList className="flex justify-center shadow-lg lg:shadow-none">
            <TabsTrigger
              /* onClick={() => {
                toast({
                  title: areAllFiltersDeactivated
                    ? "It's more fun with at least one filter!"
                    : "The map is updated with your filter settings!",
                  action: (
                    <ToastAction altText="Goto schedule to undo">
                      {areAllFiltersDeactivated ? "leave me alone!" : "Thanks!"}
                    </ToastAction>
                  ),
                })
              }} */
              value="map"
            >
              map
            </TabsTrigger>
            <TabsTrigger value="list">list</TabsTrigger>
          </TabsList>
        </div>

        <LayoutGroup>
          <TabsContent value="map">
            <MapVisualizer
              lowestYear={lowestYear}
              highestYear={highestYear}
              filterHighestYear={filterHighestYear}
              updateFilterHighestYear={updateFilterHighestYear}
              searchData={searchData}
            />
          </TabsContent>
          <TabsContent value="list">
            {filteredLocationsData && <List />}
          </TabsContent>
        </LayoutGroup>
      </Tabs>
      <Toaster />
    </m.section>
  )
}
