"user client"

import { Suspense, useEffect, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  GetLocationsWithEventCount,
  GetTitleEvents,
} from "@/components/maps/getMergedLocations"

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

  async function EventListAccordion(countId) {
    const events = await GetTitleEvents(countId)
    console.log(events, "data title")

    return Object.entries(events).map(([eventId, eventData]) => (
      <div key={eventId} className="flex border-0 justify-normal ml-6">
        <div className="flex justify-normal py-1 items-center">
          <Badge variant={"secondary"} className="w-14 flex justify-center">
            {eventId}
          </Badge>
        </div>
        <div className="flex items-center ml-2">
          <p>{eventData.dates[0].date}</p>
        </div>
      </div>
    ))
  }

  return (
    <section className="">
      <div className="absolute top-52 bottom-10 left-10">
        <h4 className="mb-4 text-lg font-black leading-none">Locations</h4>
        <ScrollArea className="h-full w-96 pr-2">
          <div className="">
            <Accordion>
              {locationsWithCount.map(
                ({ locationId, title, coordinates, count, eventIds }) => (
                  <AccordionItem
                    className="border-0 justify-normal"
                    value={locationId}
                  >
                    <AccordionTrigger
                      id={locationId}
                      className="flex justify-normal space-x-2 py-1"
                    >
                      {" "}
                      <div className="h-5 flex justify-center mt-1 w-14">
                        <Badge className="w-14 flex justify-center">
                          {locationId}
                        </Badge>
                      </div>
                      <p
                        className="text-left flex justify-self-start"
                        key={locationId}
                      >
                        {title} for {count} times
                      </p>
                    </AccordionTrigger>
                    <AccordionContent>
                      <Suspense>
                        <EventListAccordion countId={eventIds} />
                      </Suspense>
                    </AccordionContent>
                  </AccordionItem>
                )
              )}
            </Accordion>
          </div>
        </ScrollArea>
      </div>
      <section className="flex content-center w-full justify-center overflow-hidden">
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
          {locationsWithCount.map(
            ({ locationId, title, coordinates, count, eventIds }) => (
              <Marker
                id={locationId}
                coordinates={coordinates}
                key={locationId}
              >
                <circle r={scaleRadius(count)} fill="white" />
              </Marker>
            )
          )}
        </ComposableMap>
      </section>
    </section>
  )
}
