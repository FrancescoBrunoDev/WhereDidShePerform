"use client"

import { Suspense, useEffect, useState } from "react"
import { motion as m } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GetLocationsWithEventsAndTitle } from "@/components/maps/getMergedLocations"

import { GetInfoPerson } from "../api/musiconn"
import { List } from "./list"
import Loading from "./loading"
import MapVisualizer from "./mapVisualizer"

export default function Composer({ params }) {
  const [locationsData, setLocationsData] = useState([])
  const [id, setId] = useState(null)
  const [isByCity, setIsByCity] = useState(true) // Track the current map type
  const { performerId } = params

  useEffect(() => {
    async function fetchData() {
      const data = await GetLocationsWithEventsAndTitle(id, isByCity)
      setLocationsData(data)
    }

    if (id) {
      if (isByCity) {
        // Fetch data based on isByCity
        fetchData()
      } else {
        // Fetch data without considering isByCity
        fetchData()
      }
    }
  }, [id, isByCity])

  useEffect(() => {
    async function getData() {
      const data = await GetInfoPerson(performerId)
      setId(data[performerId])
    }
    getData()
  }, [performerId])
  let highestYear = null
  let lowestYear = null

  if (isByCity) {
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
  } else {
    if (locationsData.length > 0) {
      locationsData.forEach(({ eventInfo }) => {
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
  }

  let filterLowestYear = lowestYear

  const [filterHighestYear, setFilterHighestYear] = useState([highestYear])

  const updateFilterHighestYear = (newValue) => {
    setFilterHighestYear(newValue)
  }
  const filteredLocationsData = isByCity
    ? locationsData
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
    : locationsData
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
            count: filteredEventInfo.length, // Count of filteredEventInfo items
          }
        })
        .filter((location) => {
          const eventInfoLength = location.eventInfo.length
          return eventInfoLength > 0
        })

  // Calculate the count of all filteredEventInfo items across all locations
  const totalCount = filteredLocationsData.reduce(
    (sum, { count }) => sum + count,
    0
  )

  return (
    <m.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: "easeInOut" }}
      className="relative"
    >
      <Tabs
        onValueChange={() => {
          setIsByCity((prevIsByCity) => !prevIsByCity)
        }}
        defaultValue="map"
      >
        <div className="container sticky top-16">
          {id && (
            <h1 className="container absolute top-16 mb-10 w-96 px-5 text-4xl font-black lg:px-0">
              {id.title}
            </h1>
          )}
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="map">map</TabsTrigger>
              <TabsTrigger value="list">list</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="map">
          <Suspense fallback={<Loading />}>
            <MapVisualizer
              locationsData={filteredLocationsData}
              lowestYear={lowestYear}
              highestYear={highestYear}
              filterHighestYear={filterHighestYear}
              updateFilterHighestYear={updateFilterHighestYear}
              isByCity={isByCity}
              setIsByCity={setIsByCity}
            />
          </Suspense>
        </TabsContent>
        <TabsContent value="list">
          <Suspense fallback={<Loading />}>
            <List locationsData={filteredLocationsData}></List>
          </Suspense>
        </TabsContent>
      </Tabs>
    </m.section>
  )
}
