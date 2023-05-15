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
      console.log(locationsData)
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
  console.log(id)
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
              <MapVisualizer locationsData={locationsData} />
            </Suspense>
          )}
        </TabsContent>
        <TabsContent value="list">
          <Suspense>
            <List locationsData={locationsData}></List>
          </Suspense>
        </TabsContent>
      </Tabs>
    </section>
  )
}
