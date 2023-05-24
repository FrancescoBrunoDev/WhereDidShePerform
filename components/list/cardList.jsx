import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion as m, useInView } from "framer-motion"

import { CardItem } from "@/components/list/cardItem"
import { Badge } from "@/components/ui/badge"
import { list } from "@/components/animationConst/animationConst"
import getRandomSentenceList from "@/components/list/randomSencences"



export default function CardList({ locationsData, areAllFiltersDeactivated }) {
  const [sentence, setSentence] = useState(getRandomSentenceList())
  const ref = useRef(null)
  const isInView = useInView(ref)

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
          <m.div variants={list} key={city.key}>
            <div className="mb-5 mt-7 flex items-center space-x-2">
              <h1 className="text-4xl font-black leading-none">{city.city}</h1>{" "}
            </div>
            {city.locations.map((location) => {
              if (location.eventInfo.length === 0) {
                return null // Skip rendering the location if it has no events
              }
              return (
                <m.div variants={list} key={location.locationId}>
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
                      <CardItem event={event} />
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
