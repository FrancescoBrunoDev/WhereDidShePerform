"use client"

import { Suspense, useEffect, useState } from "react"
import { AnimatePresence, motion as m } from "framer-motion"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GetLocationsWithEventsAndTitle } from "@/components/maps/getMergedLocations"

import { GetInfoPerson } from "../api/musiconn"
import List from "./list"
import Loading from "./loading"
import MapVisualizer from "./mapVisualizer"

const geoUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/27a335110674ae5b01a84d3501b227e661beea2b/TopoJSON/europe.topojson"

const worldUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function Composer({ params }) {
  const [locationsData, setLocationsData] = useState([])
  const [id, setId] = useState(null)
  const [isByCity, setIsByCity] = useState(true) // Track the current map type

  const [mapUrl, setMapUrl] = useState(geoUrl) // Initial map URL is geoUrl
  const [isHighQuality, setIsHighQuality] = useState(true) // Track the current map type
  const [isEuropeMap, setIsGeoMap] = useState(true) // Track the current map type
  const [changeMap, setChangeMap] = useState(0)

  const { performerId } = params

  useEffect(() => {
    async function fetchData() {
      const data = await GetLocationsWithEventsAndTitle(id)
      setLocationsData(data)
    }

    if (id) {
      fetchData()
    }
  }, [id])

  useEffect(() => {
    async function getData() {
      const data = await GetInfoPerson(performerId)
      setId(data[performerId])
    }
    getData()
  }, [performerId])

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

  const [filterHighestYear, setFilterHighestYear] = useState([highestYear])

  const updateFilterHighestYear = (newValue) => {
    setFilterHighestYear(newValue)
  }
  const filteredLocationsData = locationsData
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
      <div className="container z-20">
        {id && (
          <h1 className="fixed top-32 z-10 w-96 text-4xl font-black">
            {id.title}
          </h1>
        )}
      </div>
      <Tabs defaultValue="map">
        <div className="fixed top-16 z-20 flex w-full justify-center">
          <div className="flex justify-center">
            <TabsList className="z-10">
              <TabsTrigger value="map">map</TabsTrigger>
              <TabsTrigger value="list">list</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <AnimatePresence>
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
                isHighQuality={isHighQuality}
                setIsHighQuality={setIsHighQuality}
                isEuropeMap={isEuropeMap}
                setIsGeoMap={setIsGeoMap}
                changeMap={changeMap}
                setChangeMap={setChangeMap}
                mapUrl={mapUrl}
                setMapUrl={setMapUrl}
              />
            </Suspense>
          </TabsContent>
          <TabsContent value="list">
            <Suspense fallback={<Loading />}>
              {filteredLocationsData && (
                <List locationsData={filteredLocationsData} id={id} />
              )}
            </Suspense>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </m.section>
  )
}
