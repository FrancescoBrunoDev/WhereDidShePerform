"user client"

import { useEffect, useState } from "react"
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
  filterHighestYear,
  updateFilterHighestYear,
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
  const [mapConfig, setMapConfig] = useState({
    scale: 850,
    center: [-3, 0],
    maxZoom: 1,
  })

  useEffect(() => {
    const updateMapConfig = () => {
      // Get the width of the screen
      const screenWidth = window.innerWidth

      // Calculate the scale and center based on the screen width
      let newScale, newCenter, newMaxZoom
      if (screenWidth < 768) {
        newScale = 1400
        newCenter = [4, 9]
        newMaxZoom = 1.5
      } else if (screenWidth < 1024) {
        newScale = 1400
        newCenter = [4, 9]
        newMaxZoom = 1.5
      } else {
        newScale = 850
        newCenter = [-3, 0]
        newMaxZoom = 1
      }

      // Update the map configuration state
      setMapConfig({
        scale: newScale,
        center: newCenter,
        maxZoom: newMaxZoom,
      })
    }

    // Call the updateMapConfig function initially and add a resize event listener
    updateMapConfig()
    window.addEventListener("resize", updateMapConfig)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateMapConfig)
    }
  }, [])

  const { scale, center, maxZoom } = mapConfig

  return (
    <section>
      <ScrollAreaMap
        locationsData={locationsData}
        onLocationHover={(locationId) => setSelectedLocationId(locationId)}
        lowestYear={lowestYear}
        highestYear={highestYear}
        filterHighestYear={filterHighestYear}
        updateFilterHighestYear={updateFilterHighestYear}
        setIsHover={setIsHover}
      />
      <section className="flex w-full content-center justify-center overflow-hidden sm:max-h-screen">
        <ComposableMap
          className="h-[85vh] w-screen cursor-move overflow-visible"
          projection="geoAzimuthalEquidistant"
          projectionConfig={{
            rotate: [-10.0, -52.0, 0],
            center: center,
            scale: scale,
          }}
        >
          <ZoomableGroup zoom={1} maxZoom={maxZoom}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    fill="rgb(4, 7, 17)"
                    stroke="white"
                    strokeWidth="0.2"
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
                    fill={selectedLocationId === locationId ? "white" : "white"}
                    style={{
                      transition: `transform ${transitionDuration}s`,
                      zIndex: selectedLocationId === locationId ? 100 : 1,
                      transform:
                        isHover && selectedLocationId === locationId
                          ? "scale(1.5)"
                          : isHover
                          ? "scale(0.2)"
                          : "scale(1)",
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
          </ZoomableGroup>
        </ComposableMap>
      </section>
    </section>
  )
}
