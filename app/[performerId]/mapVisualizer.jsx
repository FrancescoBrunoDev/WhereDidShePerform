"user client"

import { useEffect, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { GetLocationsWithEventCount } from "@/components/maps/getMergedLocations"

const geoUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/27a335110674ae5b01a84d3501b227e661beea2b/TopoJSON/europe.topojson"

export default function MapChart({ id }) {
  const [locationsWithCount, setLocationsWithCount] = useState([])
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

  useEffect(() => {
    async function fetchData() {
      const data = await GetLocationsWithEventCount(id)
      setLocationsWithCount(data)
    }
    fetchData()
  }, [id])

  return (
    <section>
      <div className="absolute top-52 left-10">
        <h4 className="mb-4 text-lg font-black leading-none">Locations</h4>
        <ScrollArea className="h-[40rem] w-96">
          <div className="">
            {locationsWithCount.map(
              ({ locationId, title, coordinates, count }) => (
                <div className="flex content-center space-x-2">
                  {" "}
                  <Badge className="h-5">{locationId}</Badge>
                  <p key={locationId}>
                   {title} for {count} times
                  </p>
                </div>
              )
            )}
          </div>
        </ScrollArea>
      </div>
      <div className="absolute top-60 left-10 w-96 font-semibold text-sm mb-10 space-y-1"></div>
      <section className="flex content-center w-full justify-center 2xl:px-72 xl:px-52 lg:px-10 md:px-10">
        <ComposableMap
          projection="geoAzimuthalEquidistant"
          projectionConfig={{
            rotate: [-10.0, -52.0, 0],
            center: [5, 0],
            scale: 800,
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
          {locationsWithCount.map(
            ({ locationId, title, coordinates, count }) => (
              <Marker coordinates={coordinates} key={locationId}>
                <circle r={scaleRadius(count)} fill="white" />
              </Marker>
            )
          )}
        </ComposableMap>
      </section>
    </section>
  )
}
