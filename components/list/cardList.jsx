import { useEffect, useState } from "react"
import { AnimatePresence, motion as m } from "framer-motion"

import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import { item, list } from "@/components/animationConst/animationConst"
import getRandomSentenceList from "@/components/list/randomSencences"

export default function CardList({ locationsData, areAllFiltersDeactivated }) {
  const [sentence, setSentence] = useState(getRandomSentenceList())

  useEffect(() => {
    const interval = setInterval(() => {
      setSentence(getRandomSentenceList())
    }, 20000) // Update sentence every 20 seconds

    return () => {
      clearInterval(interval) // Clean up the interval on component unmount
    }
  }, [])

  if (locationsData.length === 0 && areAllFiltersDeactivated) {
    return (
      <div className="container -z-10 mx-auto">
        <div className="flex h-[90vh] items-center justify-center text-center">
          <AnimatePresence initial={false} mode="wait">
            <m.div
              key={sentence}
              className="max-w-sm rounded-lg bg-secondary p-2 text-sm font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {sentence}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    )
  }

  return (
    <div className="container -z-10 mx-auto pt-72">
      {locationsData.map((city) => {
        const hasEvents = city.locations.some(
          (location) => location.eventInfo.length > 0
        )
        if (!hasEvents) {
          return null // Skip rendering the city if it has no events
        }
        return (
          <m.div key={city.key}>
            <div className="mb-5 mt-7 flex items-center space-x-2">
              <h1 className="text-4xl font-black leading-none">{city.city}</h1>{" "}
            </div>
            {city.locations.map((location) => {
              if (location.eventInfo.length === 0) {
                return null // Skip rendering the location if it has no events
              }
              return (
                <m.div
                  initial="hidden"
                  animate="visible"
                  variants={list}
                  key={location.locationId}
                >
                  <div className="mb-5 mt-7 flex items-center space-x-2">
                    <h1 className="text-lg font-black leading-none">
                      {location.title}
                    </h1>{" "}
                    <Badge className="flex h-6 w-14 justify-center">
                      {location.locationId}
                    </Badge>
                  </div>
                  <m.div className="grid grid-flow-row grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {location.eventInfo.map((event) => (
                      <m.div key={event.eventId} variants={item}>
                        <Card>
                          <CardHeader>
                            <div className="flex items-center text-lg">
                              <div className="w-8">
                                <Badge className="-z-10 flex w-14 origin-center -translate-x-3 -rotate-90 justify-center">
                                  {event.eventId}
                                </Badge>
                              </div>
                              <div className="grid w-full grid-cols-1 justify-center gap-2">
                                <div className="text-c inline-flex items-center rounded-lg bg-secondary px-2.5 py-0.5 text-xs font-bold">
                                  {event.date}
                                </div>
                                <div className="inline-flex items-center rounded-lg bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                                  {event.eventCategory === 1
                                    ? "Season"
                                    : event.eventCategory === 2
                                    ? "Concert"
                                    : event.eventCategory === 3
                                    ? "Religious Event"
                                    : event.eventCategory === 4
                                    ? "Music Theater"
                                    : event.eventCategory}
                                </div>
                              </div>
                            </div>

                            {event.composerNamesArray &&
                              event.composerNamesArray.length > 0 && (
                                <m.div
                                  key={event.composerNamesArray}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                  <m.span>
                                    {event.composerNamesArray.map(
                                      (composer, index) => (
                                        <m.span key={composer?.title}>
                                          {composer?.title}
                                          {index <
                                            event.composerNamesArray.length -
                                              1 && " • "}
                                        </m.span>
                                      )
                                    )}
                                  </m.span>
                                </m.div>
                              )}
                          </CardHeader>
                        </Card>
                      </m.div>
                    ))}
                  </m.div>
                </m.div>
              )
            })}
          </m.div>
        )
      })}
    </div>
  )
}
