import { Suspense } from "react"
import { useCallback } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ScrollAreaMap({ locationsData, onLocationHover }) {
    const handleAccordionHover = useCallback((locationId) => {
      onLocationHover(locationId);
    }, [onLocationHover]);
  return (
    <div className="absolute top-52 bottom-10 left-10">
      <h4 className="mb-4 text-lg font-black leading-none">Locations</h4>
      <ScrollArea className="h-full w-96 pr-2">
        <div className="">
          <Accordion>
            {locationsData.map(({ locationId, title, count, eventInfo }) => (
              <AccordionItem
                className="border-0 justify-normal"
                value={locationId}
                key={locationId}
                id={locationId}
              >
                <AccordionTrigger
                  id={locationId}
                  className="flex justify-normal space-x-2 py-1"
                  onMouseEnter={() => handleAccordionHover(locationId)}
                  onMouseLeave={() => handleAccordionHover(null)}
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
                    {eventInfo.map(({ eventId, date }) => (
                      <div
                        key={eventId}
                        className="flex border-0 justify-normal ml-6"
                      >
                        <div className="flex justify-normal py-1 items-center">
                          <Badge
                            variant={"secondary"}
                            className="w-14 flex justify-center"
                          >
                            {eventId}
                          </Badge>
                        </div>
                        <div className="flex items-center ml-2">
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
