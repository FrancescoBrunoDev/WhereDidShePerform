import { Suspense, useCallback } from "react"
import { animated, useTrail } from "@react-spring/web"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SliderLifeTime } from "@/components/ui/sliderLifeTime"

export default function ScrollAreaMap({
  locationsData,
  onLocationHover,
  lowestYear,
  highestYear,
  updateFilterHighestYear,
  setIsHover,
  filterHighestYear,
}) {
  const handleAccordionHover = useCallback(
    (locationId) => {
      onLocationHover(locationId)
    },
    [onLocationHover]
  )

  return (
    <div className="invisible absolute bottom-36 left-10 top-52 lg:visible">
      <h4 className="mb-4 text-2xl font-black leading-none">Career Timeline</h4>
      <div className="mt-5 flex justify-normal space-x-2 py-1 pb-5">
        <p>{lowestYear}</p>
        <SliderLifeTime
          defaultValue={[50000]}
          min={lowestYear}
          max={highestYear}
          step={1}
          highestYear={[highestYear]}
          lowestYear={lowestYear}
          filterHighestYear={filterHighestYear}
          onValueChange={(newValue) => {
            updateFilterHighestYear(newValue[0])
          }}
        />
        <p>{highestYear}</p>
      </div>

      <h4 className="mb-4 text-2xl font-black leading-none">Locations</h4>

      <ScrollArea className="translucent-background m-3 h-full w-96 rounded-lg pr-2">
        <div className="">
          <Accordion>
            {locationsData.map(({ locationId, title, count, eventInfo }) => (
              <AccordionItem
                className="justify-normal border-0"
                value={locationId}
                key={locationId}
                id={locationId}
                onMouseEnter={() => {
                  handleAccordionHover(locationId)
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
                    <Badge className="flex w-14 justify-center">
                      {locationId}
                    </Badge>
                  </div>
                  <p
                    className="mx-1 flex w-full justify-self-start rounded-lg p-2 text-left hover:bg-secondary hover:text-primary "
                    key={locationId}
                  >
                    {title} for {count} times
                  </p>
                </AccordionTrigger>
                <AccordionContent>
                  <Suspense>
                    {eventInfo.map(({ eventId, date }) => (
                      <div
                        key={eventId}
                        className="ml-6 flex justify-normal border-0"
                      >
                        <div className="flex items-center justify-normal py-1">
                          <Badge
                            variant={"secondary"}
                            className="flex w-14 justify-center"
                          >
                            {eventId}
                          </Badge>
                        </div>
                        <div className="ml-2 flex items-center">
                          <p>{date}</p>
                        </div>
                      </div>
                    ))}
                  </Suspense>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
