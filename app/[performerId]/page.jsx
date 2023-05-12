"use client"

import React, { Suspense } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GetLocationsWithEventCount } from "@/components/maps/getMergedLocations"

import { GetInfoPerson } from "../api/musiconn"
import { List } from "./list"
import MapVisualizer from "./mapVisualizer"

export default async function Composer({ params }) {
  const { performerId } = params
  const data = await GetInfoPerson(performerId)
  const id = data[performerId]

  return (
    <section className="relative">
      <Tabs defaultValue="map">
        <div className="w-full flex justify-center sticky top-16">
          <h1 className="absolute top-16 left-10 w-96 font-black text-4xl mb-10">
            {id.title}
          </h1>
          <TabsList>
            <TabsTrigger value="map">map</TabsTrigger>
            <TabsTrigger value="list">list</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="map">
          <Suspense>
            <MapVisualizer id={id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="list">
          <Suspense>
            <List id={id}></List>
          </Suspense>
        </TabsContent>
      </Tabs>
    </section>
  )
}
