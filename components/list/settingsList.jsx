import { AnimatePresence, LayoutGroup, motion as m } from "framer-motion"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle"
import { Icons } from "@/components/icons"

import { ComposerSearchBox } from "./composerSearchBox"
import { FilterList } from "./filterList"

export function SettingsList({
  setConcerts,
  concerts,
  setExpandedLocations,
  expandedLocations,
  musicTheater,
  setMusicTheater,
  isConcertAvailable,
  isMusicTheaterAvailable,
  setReligiousEvent,
  religiousEvent,
  isReligiousEventAvailable,
  setSeason,
  season,
  isSeasonAvailable,
  locationsData,
  setSelectedComposerNames,
  selectedComposerNames,
}) {
  const isFilterActive =
    isConcertAvailable ||
    isMusicTheaterAvailable ||
    isReligiousEventAvailable ||
    isSeasonAvailable

  return (
    <m.div layout className="container flex justify-center lg:justify-end">
      <m.div
        layout
        initial={{ x: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-40 z-30 flex flex-wrap items-center divide-inherit rounded-lg bg-secondary px-4 py-2 md:space-y-0"
      >
        <m.div layout className="hidden lg:block">
          <m.div
            layout
            className="flex grow justify-center space-x-3 py-3 lg:justify-end"
          >
            <FilterList
              setConcerts={setConcerts}
              concerts={concerts}
              musicTheater={musicTheater}
              setMusicTheater={setMusicTheater}
              isConcertAvailable={isConcertAvailable}
              isMusicTheaterAvailable={isMusicTheaterAvailable}
              setReligiousEvent={setReligiousEvent}
              religiousEvent={religiousEvent}
              isReligiousEventAvailable={isReligiousEventAvailable}
              setSeason={setSeason}
              season={season}
              isSeasonAvailable={isSeasonAvailable}
            />
          </m.div>
        </m.div>
        <div className="block lg:hidden">
          <Popover openDelay={200}>
            <PopoverTrigger>
              {" "}
              <Toggle checked={!isFilterActive}>Filters</Toggle>
            </PopoverTrigger>
            <PopoverContent align="start" className="mt-2">
              {" "}
              <FilterList
                setConcerts={setConcerts}
                concerts={concerts}
                musicTheater={musicTheater}
                setMusicTheater={setMusicTheater}
                isConcertAvailable={isConcertAvailable}
                isMusicTheaterAvailable={isMusicTheaterAvailable}
                setReligiousEvent={setReligiousEvent}
                religiousEvent={religiousEvent}
                isReligiousEventAvailable={isReligiousEventAvailable}
                setSeason={setSeason}
                season={season}
                isSeasonAvailable={isSeasonAvailable}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Separator className="bg-primary" orientation="vertical" />

        <m.div className="flex h-10 justify-end space-x-2 pl-3">
          <AnimatePresence initial={false} mode="wait">
            {expandedLocations && (
              <m.div
              layout
                key="composerSearchBox"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 270, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex h-10 justify-end space-x-2 pl-3"
              >
                <ComposerSearchBox
                  locationsData={locationsData}
                  setSelectedComposerNames={setSelectedComposerNames}
                  selectedComposerNames={selectedComposerNames}
                />
              </m.div>
            )}
          </AnimatePresence>
          <LayoutGroup>
            <Toggle
              onPressedChange={() => {
                setExpandedLocations(
                  (prevExpandedLocations) => !prevExpandedLocations
                )
                setSelectedComposerNames([])
              }}
              checked={expandedLocations}
            >
              
              {expandedLocations ? (
                <LayoutGroup>
                  <Icons.exit />
                </LayoutGroup>
              ) : (
                "How did s(he) played"
              )}
            </Toggle>
          </LayoutGroup>
        </m.div>
      </m.div>
    </m.div>
  )
}
