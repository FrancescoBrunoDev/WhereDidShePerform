import { useEffect, useState } from "react"

import CardList from "@/components/list/cardList"
import {
  checkCategoryAvailability,
  filterLocationsData,
} from "@/components/list/filterLocationsData"
import SettingsList from "@/components/list/settingsList"

export async function List({ locationsData, id }) {
  const [expandedLocations, setExpandedLocations] = useState(false)
  const [concerts, setConcerts] = useState(true)
  const [musicTheater, setMusicTheater] = useState(true)
  const [religiousEvent, setReligiousEvent] = useState(true)
  const [season, setSeason] = useState(true)
  const [filteredLocationsData, setFilteredLocationsData] =
    useState(locationsData)
  const [isConcertCategoryAvailable, setIsConcertCategoryAvailable] =
    useState(true)
  const [isMusicTheaterCategoryAvailable, setIsMusicTheaterCategoryAvailable] =
    useState(true)
  const [isReligiousEventAvailable, setIsReligiousEventAvailable] =
    useState(true)
  const [isSeasonAvailable, setIsSeasonAvailable] = useState(true)

  useEffect(() => {
    filterLocationsData(
      expandedLocations,
      concerts,
      musicTheater,
      religiousEvent,
      season,
      id,
      locationsData,
      setFilteredLocationsData
    )

    const seasonAvailable = checkCategoryAvailability(locationsData, 1)
    setIsSeasonAvailable(seasonAvailable)

    const concertAvailable = checkCategoryAvailability(locationsData, 2)
    setIsConcertCategoryAvailable(concertAvailable)

    const religiousEventAvailable = checkCategoryAvailability(locationsData, 3)
    setIsReligiousEventAvailable(religiousEventAvailable)

    const musicTheaterAvailable = checkCategoryAvailability(locationsData, 4)
    setIsMusicTheaterCategoryAvailable(musicTheaterAvailable)
  }, [
    expandedLocations,
    concerts,
    musicTheater,
    religiousEvent,
    season,
    id,
    locationsData,
    setFilteredLocationsData,
  ])

  return (
    <>
      <div className="sticky top-0 h-56 w-full bg-gradient-to-b from-background to-transparent " />
      <div className="container sticky top-40 flex justify-end text-4xl font-black leading-none">
        <SettingsList
          setConcerts={setConcerts}
          concerts={concerts}
          setExpandedLocations={setExpandedLocations}
          expandedLocations={expandedLocations}
          setMusicTheater={setMusicTheater}
          musicTheater={musicTheater}
          isConcertAvailable={isConcertCategoryAvailable}
          isMusicTheaterAvailable={isMusicTheaterCategoryAvailable}
          setReligiousEvent={setReligiousEvent}
          religiousEvent={religiousEvent}
          isReligiousEventAvailable={isReligiousEventAvailable}
          setSeason={setSeason}
          season={season}
          isSeasonAvailable={isSeasonAvailable}
        />
      </div>
      <section className="mb-10 lg:container">
        <CardList locationsData={filteredLocationsData} />
      </section>
    </>
  )
}
