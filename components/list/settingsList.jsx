import { useEffect, useState } from "react"
import { motion as m } from "framer-motion"

import { Button, buttonVariants } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"
import { Icons } from "@/components/icons"
import { getAvailableComposers } from "@/components/list/filterLocationsData"

export function FilterList({
  setConcerts,
  concerts,
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
}) {
  return (
    <>
      {isConcertAvailable && (
        <div className="flex-cols-2 flex items-center space-x-2">
          <Label>Concerts</Label>
          <Switch
            onCheckedChange={() => {
              setConcerts((prevConcerts) => !prevConcerts)
            }}
            checked={concerts}
          />
        </div>
      )}
      {isMusicTheaterAvailable && (
        <div className="flex-cols-2 flex items-center space-x-2">
          <Label>Music Theatre</Label>
          <Switch
            onCheckedChange={() => {
              setMusicTheater((prevMusicTheater) => !prevMusicTheater)
            }}
            checked={musicTheater}
          />
        </div>
      )}
      {isReligiousEventAvailable && (
        <div className="flex-cols-2 flex items-center space-x-2">
          <Label>Religious Event</Label>
          <Switch
            onCheckedChange={() => {
              setReligiousEvent((prevReligiousEvent) => !prevReligiousEvent)
            }}
            checked={religiousEvent}
          />
        </div>
      )}
      {isSeasonAvailable && (
        <div className="grid grid-cols-2 items-center space-x-2">
          <Label>Season</Label>
          <Switch
            onCheckedChange={() => {
              setSeason((prevSeason) => !prevSeason)
            }}
            checked={season}
          />
        </div>
      )}
    </>
  )
}

export function ComposerSearchBox({ locationsData }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [selectedComposerNames, setSelectedComposerNames] = useState([])

  const availableComposers = getAvailableComposers(locationsData)

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value
    setSearchQuery(newSearchQuery)

    const matchedSuggestions = availableComposers.filter((composer) =>
      composer.name.title.title
        .toLowerCase()
        .startsWith(newSearchQuery.toLowerCase())
    )
    setSuggestions(matchedSuggestions)
  }

  console.log(selectedComposerNames, "selectedComposerNames")
  const filteredData = locationsData
    .map((city) => {
      const filteredLocations = city.locations
        .map((location) => {
          const filteredEventInfo = location.eventInfo.filter((event) => {
            const composerNamesArray = event?.composerNamesArray
            if (composerNamesArray) {
              const hasMatch = composerNamesArray.some((composer) =>
                selectedComposerNames.includes(composer.title)
              )
              if (hasMatch) {
                return true // Keep the event if it has a match
              }
            }
            return false
          })

          return {
            ...location,
            eventInfo: filteredEventInfo,
          }
        })
        .filter((location) => location.eventInfo.length > 0)

      return {
        ...city,
        locations: filteredLocations,
      }
    })
    .filter((city) => city.locations.length > 0)

  console.log(filteredData, "filteredData")

  return (
    <div className="flex-cols-2 flex w-full content-center space-x-2 pb-5">
      <div className="static">
        <Input
          placeholder="Composer"
          value={searchQuery}
          onChange={handleInputChange}
        />
        {suggestions.length > 0 && (
          <ScrollArea className="absolute mt-3 h-72 rounded-md border bg-background">
            <m.div className="p-4">
              {suggestions.map((suggestion) => (
                <div
                  className="flex items-center space-x-2 rounded-lg p-2 hover:bg-secondary"
                  key={suggestion.id}
                  style={{ cursor: "pointer" }}
                >
                  <Checkbox
                    id="composer"
                    name={suggestion.name.title.title}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedComposerNames((prevNames) => [
                          ...prevNames,
                          suggestion.name.title.title,
                        ])
                      } else {
                        setSelectedComposerNames((prevNames) =>
                          prevNames.filter(
                            (name) => name !== suggestion.name.title.title
                          )
                        )
                      }
                      setSearchQuery("") // Clear the search query
                    }}
                  />
                  <Label htmlFor="composer">
                    {suggestion.name.title.title}
                  </Label>
                </div>
              ))}
            </m.div>
          </ScrollArea>
        )}
      </div>
      {/* Additional rendering logic using filteredEvents */}
    </div>
  )
}

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
}) {
  const isFilterActive =
    isConcertAvailable ||
    isMusicTheaterAvailable ||
    isReligiousEventAvailable ||
    isSeasonAvailable

  return (
    <m.div className="container flex justify-center lg:justify-end">
      <m.div
        initial={{ x: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-40 z-30 flex flex-wrap items-center divide-inherit rounded-lg bg-secondary px-4 py-2 md:space-y-0"
      >
        <div className="hidden lg:block">
          <div className="flex grow justify-center space-x-3 py-3 lg:justify-end">
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
          </div>
        </div>
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

        <div className="flex-cols-2 flex h-10 space-x-2 pl-3">
          {expandedLocations && (
            <ComposerSearchBox locationsData={locationsData} />
          )}

          <Toggle
            onPressedChange={() => {
              setExpandedLocations(
                (prevExpandedLocations) => !prevExpandedLocations
              )
            }}
            checked={expandedLocations}
          >
            {expandedLocations ? <Icons.exit /> : "How did s(he) played?"}
          </Toggle>
        </div>
      </m.div>
    </m.div>
  )
}
