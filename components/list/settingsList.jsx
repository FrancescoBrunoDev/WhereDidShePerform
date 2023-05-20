import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Toggle } from "@/components/ui/toggle"

export default function SettingsList({
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
}) {
  return (
    <div className="container fixed top-56 z-10 flex items-center justify-around lg:top-40 lg:justify-end">
      <div className="flex flex-wrap items-center space-x-3 divide-x divide-inherit rounded-lg bg-secondary py-2 px-4 md:space-y-0">
        <div className="flex grow justify-center space-x-3 py-3 lg:justify-end">
          {isConcertAvailable && (
            <div className="flex-cols-2 flex items-center space-x-2">
              <Label>Concerts {}</Label>
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
              <Label>Music Theatre {}</Label>
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
              <Label>Religious Event {}</Label>
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
              <Label>Season {}</Label>
              <Switch
                onCheckedChange={() => {
                  setSeason((prevSeason) => !prevSeason)
                }}
                checked={season}
              />
            </div>
          )}
        </div>

        <div className="pl-3">
          <Toggle
            onPressedChange={() => {
              setExpandedLocations(
                (prevExpandedLocations) => !prevExpandedLocations
              )
            }}
            checked={expandedLocations}
          >
            How did s(he) played?
          </Toggle>
        </div>
      </div>
    </div>
  )
}
