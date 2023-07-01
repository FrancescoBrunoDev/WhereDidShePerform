"user client"

import { useState } from "react"

import MapCamp from "@/components/maps/mapCamp"
import ScrollAreaMap from "@/components/maps/scrollAreaMap"

export default function MapVisualizer({ searchData }) {
  return (
    <section>
      <ScrollAreaMap searchData={searchData} />

      <div>
        <MapCamp />
      </div>
    </section>
  )
}
