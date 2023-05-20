import { Suspense, useEffect, useState } from "react"

import CardList from "@/components/list/cardList"
import {
  checkCategoryAvailability,
  filterLocationsData,
} from "@/components/list/filterLocationsData"
import SettingsList from "@/components/list/settingsList"
import { Loading } from "@/components/loading"

export default function List({ locationsData, id }) {
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

      <Suspense fallback={<Loading />}>
        <section className="relative mb-10 lg:container">
          <CardList locationsData={filteredLocationsData} />
          <div className="fixed top-0 h-80 w-full bg-gradient-to-b from-background from-70% via-background to-transparent" />
        </section>
      </Suspense>
    </>
  )
}
