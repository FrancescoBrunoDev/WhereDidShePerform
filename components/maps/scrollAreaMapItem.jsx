import { Suspense, useState } from "react"
import Link from "next/link"
import { linkMaker } from "@/utils/linkMaker"

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function ScrollAreaItem({
  locationsData,
  handleAccordionHover,
  setIsHover,
}) {
  const [visibleItems, setVisibleItems] = useState(20)

  return (
    <div>
      {locationsData?.map(({ city, locations, key }) => (
        <div key={key}>
          <h2 className="font-black">{city}</h2>
          {locations.map(({ locationId, title, count, eventInfo }) => {
            const locationTitleLink = linkMaker(title)
            return (
              <AccordionItem
                className="justify-normal border-0"
                value={locationId}
                key={locationId}
                id={locationId}
                onMouseEnter={() => {
                  handleAccordionHover(key)
                  setIsHover(true)
                }}
                onMouseLeave={() => {
                  handleAccordionHover(null)
                  setIsHover(false)
                }}
              >
                <AccordionTrigger
                  id={locationId}
                  className="flex justify-normal py-0 hover:no-underline"
                >
                  {" "}
                  <div className="mt-1 flex h-5 w-14 justify-center">
                    <Link
                      href={`https://performance.musiconn.de/location/${locationTitleLink}`}
                      target="_blank"
                    >
                      <Badge className="flex w-14 justify-center">
                        {locationId}
                      </Badge>
                    </Link>
                  </div>
                  <p
                    className="mx-1 flex w-full justify-self-start rounded-lg p-2 text-left  hover:bg-secondary hover:text-primary"
                    key={key}
                  >
                    {title} for {count} {count === 1 ? "time" : "times"}
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <Suspense>
                    {eventInfo
                      .slice(0, visibleItems)
                      .map(({ eventId, date, eventTitle }) => {
                        const cleanedTitleLink = linkMaker(eventTitle)
                        return (
                          <div
                            key={eventId}
                            className="ml-6 flex justify-normal border-0"
                          >
                            <div className="flex items-center justify-normal py-1">
                              <Link
                                href={`https://performance.musiconn.de/event/${cleanedTitleLink}`}
                                target="_blank"
                              >
                                <Badge className="flex w-14 justify-center">
                                  {eventId}
                                </Badge>
                              </Link>
                            </div>
                            <div className="ml-2 flex items-center">
                              <p>{date}</p>
                            </div>
                          </div>
                        )
                      })}
                    {visibleItems < eventInfo.length && (
                      <div className="flex w-full justify-center pb-5">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setVisibleItems(
                              (prevVisibleItems) => prevVisibleItems + 20
                            )
                          }}
                        >
                          Show More
                        </Button>
                      </div>
                    )}
                  </Suspense>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </div>
      ))}
    </div>
  )
}
