"use client"

import { Suspense, useEffect, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GetLocationsWithEventsAndTitle } from "@/components/maps/getMergedLocations"

import { GetInfoPerson } from "../api/musiconn"
import { List } from "./list"
import MapVisualizer from "./mapVisualizer"

export default function Composer({ params }) {
  const [locationsData, setLocationsData] = useState([])
  const [id, setId] = useState(null)
  const { performerId } = params

  useEffect(() => {
    async function fetchData() {
      const data = await GetLocationsWithEventsAndTitle(id)
      setLocationsData(data)
    }
    if (id) fetchData()
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

  locationsData.map(({ eventInfo }) => {
    eventInfo.map(({ date }) => {
      const year = Number(date.substr(0, 4)) // Estrae l'anno dai primi 4 caratteri della stringa

      if (highestYear === null || year > highestYear) {
        highestYear = year
      }

      if (lowestYear === null || year < lowestYear) {
        lowestYear = year
      }
    })
  })

  let filterHighestYear = highestYear

  const [filterLowestYear, setFilterLowestYear] = useState([lowestYear])

  const updateFilterLowestYear = (newValue) => {
    setFilterLowestYear(newValue);
  };

  const filteredLocationsData = locationsData
    .map((location) => {
      const filteredEventInfo = location.eventInfo.filter(({ date }) => {
        const year = Number(date.substr(0, 4))
        return year >= filterLowestYear && year <= filterHighestYear
      })

      return {
        ...location,
        eventInfo: filteredEventInfo,
      }
    })
    .filter((location) => location.eventInfo.length > 0)

  return (
    <section className="container relative">
      <Tabs defaultValue="map">
        <div className="sticky top-16 flex w-full justify-center">
          {id && (
            <h1 className="absolute left-0 top-16 mb-10 w-96 text-4xl font-black">
              {id.title}
            </h1>
          )}
          <TabsList>
            <TabsTrigger value="map">map</TabsTrigger>
            <TabsTrigger value="list">list</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="map">
          {locationsData && (
            <Suspense>
              <MapVisualizer
                locationsData={filteredLocationsData}
                lowestYear={lowestYear}
                highestYear={highestYear}
                filterLowestYear={filterLowestYear}
                updateFilterLowestYear={updateFilterLowestYear}
              />
            </Suspense>
          )}
        </TabsContent>
        <TabsContent value="list">
          <Suspense>
            <List locationsData={filteredLocationsData}></List>
          </Suspense>
        </TabsContent>
      </Tabs>
    </section>
  )
}
