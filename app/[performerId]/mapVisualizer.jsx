"user client"

import { useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

import ScrollAreaMap from "@/components/maps/scrollAreaMap"

const geoUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/27a335110674ae5b01a84d3501b227e661beea2b/TopoJSON/europe.topojson"

  const worldUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"


export default function MapVisualizer({
  locationsData,
  lowestYear,
  highestYear,
  filterLowestYear,
  updateFilterLowestYear,
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(null)
  const [isHover, setIsHover] = useState(false)
  const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x))
  }

  const scaleRadius = (count) => {
    const minRadius = 2
    const maxRadius = 10
    const scaleFactor = 5
    const x = (count - scaleFactor) / scaleFactor
    const radius = sigmoid(x) * (maxRadius - minRadius) + minRadius
    return radius
  }

  console.log(isHover, "isHover")

  return (
    <section className="">
      <ScrollAreaMap
        locationsData={locationsData}
        onLocationHover={(locationId) => setSelectedLocationId(locationId)}
        lowestYear={lowestYear}
        highestYear={highestYear}
        filterLowestYear={filterLowestYear}
        updateFilterLowestYear={updateFilterLowestYear}
        setIsHover={setIsHover}
      />
      <section className="flex w-full content-center justify-center overflow-hidden">
        <ComposableMap
          className="h-[85vh] w-screen"
          projection="geoAzimuthalEquidistant"
          projectionConfig={{
            rotate: [-10.0, -52.0, 0],
            center: [-3, 0],
            scale: 850,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  fill="#040711"
                  stroke="white"
                  strokeWidth="0.1"
                  geography={geo}
                />
              ))
            }
          </Geographies>

          {locationsData.map(({ locationId, coordinates, count }) => {
            const transitionDuration =
              Math.floor(Math.random() * 900 + 100) / 1000 // Generate a random value between 0.1 and 1

            return (
              <Marker
                id={locationId}
                coordinates={coordinates}
                key={locationId}
              >
                <circle
                  r={scaleRadius(count)}
                  fill={selectedLocationId === locationId ? "red" : "white"}
                  style={{
                    transition: `transform ${transitionDuration}s`,
                    zIndex: selectedLocationId === locationId ? 100 : 1,
                    transform:
                      isHover && selectedLocationId === locationId
                        ? "scale(1.5)"
                        : isHover
                        ? "scale(0.2)"
                        : "scale(1)",
                        animation: isHover && selectedLocationId !== locationId ? "circling 2s infinite" : "none",
                  }}
                  onMouseEnter={() => {
                    setSelectedLocationId(locationId)
                    setIsHover(true)
                  }}
                  onMouseLeave={() => {
                    setSelectedLocationId(null)
                    setIsHover(false)
                  }}
                />
              </Marker>
            )
          })}
        </ComposableMap>
      </section>
    </section>
  )
}
