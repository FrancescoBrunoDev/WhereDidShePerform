import { Suspense, useCallback, useEffect, useState } from "react"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Slider } from "@/components/ui/slider"

export default function ScrollAreaMap({
  locationsData,
  onLocationHover,
  lowestYear,
  highestYear,
  filterLowestYear,
  updateFilterHighestYear,
  setIsHover
}) {


  const handleAccordionHover = useCallback(
    (locationId) => {
      onLocationHover(locationId);
    },
    [onLocationHover]
  );
 

  return (
    <div className="absolute bottom-36 left-10 top-52">
      <h4 className="mb-4 text-2xl font-black leading-none">Career Limeline</h4>
      <div className="mt-5 flex justify-normal space-x-2 py-1 pb-5">
        <p>{lowestYear}</p>
        <Slider
          defaultValue={[lowestYear]}
          min={lowestYear}
          max={highestYear}
          step={1}
          filterLowestYear={[filterLowestYear]}
          onValueChange={(newValue) => {
            updateFilterHighestYear(newValue[0]);
          }}
        />
        <p>{highestYear}</p>
      </div>
      <h4 className="mb-4 text-2xl font-black leading-none">Locations</h4>

      <ScrollArea className="h-full w-96 pr-2">
        <div className="">
          <Accordion>
            {locationsData.map(({ locationId, title, count, eventInfo }) => (
              <AccordionItem
                className="justify-normal border-0"
                value={locationId}
                key={locationId}
                id={locationId}
              >
                <AccordionTrigger
                  id={locationId}
                  className="flex justify-normal space-x-2 py-1"
                  onMouseEnter={() => {
                    handleAccordionHover(locationId);
                    setIsHover(true);
                  }}
                  onMouseLeave={() => {
                    handleAccordionHover(null);
                    setIsHover(false);
                  }}
                >
                  {" "}
                  <div className="mt-1 flex h-5 w-14 justify-center">
                    <Badge className="flex w-14 justify-center">
                      {locationId}
                    </Badge>
                  </div>
                  <p
                    className="flex justify-self-start text-left"
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
