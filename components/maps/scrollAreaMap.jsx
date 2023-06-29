import { Suspense, useCallback, useState } from "react"
import { AnimatePresence, motion as m } from "framer-motion"
import { useStoreSettingMap } from "@/store/useStoreSettingMap"

import { Accordion } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"
import CarrerTimeline from "@/components/maps/careerTimeline"
import { DatePicker } from "@/components/researchDate/eventPicker"

import ScrollAreaItem from "./scrollAreaMapItem"

export default function ScrollAreaMap({
  onLocationHover,
  lowestYear,
  highestYear,
  updateFilterHighestYear,
  setIsHover,
  filterHighestYear,
  expandedLocations,
  searchData,
}) {
  const [isTimeVisible, setIsTimeVisible] = useState(false)
  const handleAccordionHover = useCallback(
    (locationId) => {
      onLocationHover(locationId)
    },
    [onLocationHover]
  )
  const thereIsMoreInWorld = useStoreSettingMap((state) => state.thereIsMoreInWorld)
  const isEuropeMap = useStoreSettingMap((state) => state.isEuropeMap)

  return (
    <Suspense>
      <m.div
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="container hidden lg:block"
      >
        <div className="fixed bottom-10 top-60 z-20 w-96">
          <m.div layout className="mb-4 mt-5 rounded-lg bg-secondary p-4">
            <m.div
              layout
              className=" flex justify-between text-xl font-black leading-none"
            >
              <m.div layout>
                {searchData ? "Pick new dates" : "Career Timeline"}
              </m.div>
              <Switch
                checked={isTimeVisible}
                onCheckedChange={() => setIsTimeVisible(!isTimeVisible)}
              ></Switch>
            </m.div>
            <AnimatePresence>
              {!isTimeVisible ? null : searchData ? (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="datePicker"
                >
                  <DatePicker searchData={searchData} />
                </m.div>
              ) : (
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="careerTimeline"
                >
                  <CarrerTimeline
                    highestYear={highestYear}
                    lowestYear={lowestYear}
                    filterHighestYear={filterHighestYear}
                    updateFilterHighestYear={updateFilterHighestYear}
                    expandedLocations={expandedLocations}
                  />
                </m.div>
              )}
            </AnimatePresence>
          </m.div>

          <m.div layout>
            <h4 className="mb-2 mt-4 text-2xl font-black leading-none">
              Locations {thereIsMoreInWorld && isEuropeMap ? "in Europe" : null}
              {thereIsMoreInWorld && !isEuropeMap ? "all over the world" : null}
            </h4>
            <div className="h-[30rem] w-full overflow-y-scroll rounded-lg pr-3">
              <Accordion collapsible>
                <ScrollAreaItem
                  handleAccordionHover={handleAccordionHover}
                  setIsHover={setIsHover}
                />
              </Accordion>
            </div>
          </m.div>
        </div>
      </m.div>
    </Suspense>
  )
}
