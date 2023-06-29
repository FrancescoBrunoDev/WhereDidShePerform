"user client"

import { useEffect, useState } from "react"

import MapCamp from "@/components/maps/mapCamp"
import ScrollAreaMap from "@/components/maps/scrollAreaMap"

export default function MapVisualizer({
  lowestYear,
  highestYear,
  filterHighestYear,
  updateFilterHighestYear,
  expandedLocations,
  searchData,
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const [isHover, setIsHover] = useState(false)


  return (
    <section>
      <ScrollAreaMap
        onLocationHover={(locationId) => setSelectedLocationId(locationId)}
        lowestYear={lowestYear}
        highestYear={highestYear}
        filterHighestYear={filterHighestYear}
        updateFilterHighestYear={updateFilterHighestYear}
        setIsHover={setIsHover}
        expandedLocations={expandedLocations}
        searchData={searchData}
      />

      <div>
        <MapCamp
          isHover={isHover}
          setIsHover={setIsHover}
          selectedLocationId={selectedLocationId}
          setSelectedLocationId={setSelectedLocationId}
        />
      </div>
    </section>
  )
}
