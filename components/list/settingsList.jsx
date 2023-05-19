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
    <>
      {isConcertAvailable && (
        <div className="grid grid-cols-2 items-center space-x-2">
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
        <div className="grid grid-cols-2 items-center space-x-2">
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
        <div className="grid grid-cols-2 items-center space-x-2">
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
      <Toggle
        onPressedChange={() => {
          setExpandedLocations(
            (prevExpandedLocations) => !prevExpandedLocations
          )
        }}
        checked={expandedLocations}
      >
        How did they play?
      </Toggle>
    </>
  )
}
