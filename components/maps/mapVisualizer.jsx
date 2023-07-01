"user client"

import { useState } from "react"

import MapCamp from "@/components/maps/mapCamp"
import ScrollAreaMap from "@/components/maps/scrollAreaMap"

export default function MapVisualizer({
  lowestYear,
  highestYear,
  filterHighestYear,
  updateFilterHighestYear,
  searchData,
}) {

  return (
    <section>
      <ScrollAreaMap
        lowestYear={lowestYear}
        highestYear={highestYear}
        filterHighestYear={filterHighestYear}
        updateFilterHighestYear={updateFilterHighestYear}
        searchData={searchData}
      />

      <div>
        <MapCamp
        />
      </div>
    </section>
  )
}
