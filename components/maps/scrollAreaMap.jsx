import { useCallback } from "react"

import { Accordion } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SliderLifeTime } from "@/components/ui/sliderLifeTime"

import ScrollAreaItem from "./scrollAreaMapItem"

export default function ScrollAreaMap({
  locationsData,
  onLocationHover,
  lowestYear,
  highestYear,
  updateFilterHighestYear,
  setIsHover,
  filterHighestYear,
  isByCity,
}) {
  const handleAccordionHover = useCallback(
    (locationId) => {
      onLocationHover(locationId)
    },
    [onLocationHover]
  )

  return (
    <div className="absolute bottom-36 top-52 hidden lg:block lg:px-0">
      <h4 className="mb-4 text-2xl font-black leading-none">Career Timeline</h4>
      <div className="mr-3 mt-5 flex items-center justify-normal space-x-2 py-1 pb-5">
        <p className="w-15">{lowestYear}</p>
        <SliderLifeTime
          className="overflow-hidden"
          defaultValue={[2050]}
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
        <p className="w-15">{highestYear}</p>
      </div>

      <h4 className="mb-4 text-2xl font-black leading-none">Locations</h4>

      <ScrollArea className="h-full w-96 rounded-lg pr-2">
        <div className="">
          <Accordion>
            <ScrollAreaItem
              locationsData={locationsData}
              handleAccordionHover={handleAccordionHover}
              setIsHover={setIsHover}
              isByCity={isByCity}
            />
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  )
}
