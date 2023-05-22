import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

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