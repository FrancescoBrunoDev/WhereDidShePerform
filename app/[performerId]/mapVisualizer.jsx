"user client"

import { useState } from "react"

import MapCamp from "@/components/maps/mapCamp"
import ScrollAreaMap from "@/components/maps/scrollAreaMap"

export default function MapVisualizer({
  locationsData,
  lowestYear,
  highestYear,
  filterHighestYear,
  updateFilterHighestYear,
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const [isHover, setIsHover] = useState(false)

  return (
    <section className="">
      <div className="container">
        <ScrollAreaMap
          locationsData={locationsData}
          onLocationHover={(locationId) => setSelectedLocationId(locationId)}
          lowestYear={lowestYear}
          highestYear={highestYear}
          filterHighestYear={filterHighestYear}
          updateFilterHighestYear={updateFilterHighestYear}
          setIsHover={setIsHover}
        />
      </div>

      <div className="flex w-full content-center justify-center overflow-hidden sm:max-h-screen">
        <MapCamp
          locationsData={locationsData}
          isHover={isHover}
          setIsHover={setIsHover}
          selectedLocationId={selectedLocationId}
          setSelectedLocationId={setSelectedLocationId}
        />
      </div>
    </section>
  )
}
