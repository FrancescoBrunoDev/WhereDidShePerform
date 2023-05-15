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

export default function MapChart({ locationsData }) {
  const [selectedLocationId, setSelectedLocationId] = useState(null)

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

  return (
    <section className="">
      <ScrollAreaMap
        locationsData={locationsData}
        onLocationHover={(locationId) => setSelectedLocationId(locationId)}
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
          {locationsData.map(({ locationId, coordinates, count }) => (
            <Marker id={locationId} coordinates={coordinates} key={locationId}>
              <circle
                r={scaleRadius(count)}
                fill={selectedLocationId === locationId ? "red" : "white"}
                style={{
                  transition: "transform 0.2s", // add a transition for a smoother effect
                  transform:
                    selectedLocationId === locationId
                      ? "scale(1.5)"
                      : "scale(1)",
                  zIndex: selectedLocationId === locationId ? 100 : 1, // set z-index to 40 if selected
                }}
                onMouseEnter={() => setSelectedLocationId(locationId)}
                onMouseLeave={() => setSelectedLocationId(null)}
              />
            </Marker>
          ))}
        </ComposableMap>
      </section>
    </section>
  )
}
