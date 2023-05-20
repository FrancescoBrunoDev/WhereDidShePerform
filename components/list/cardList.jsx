import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"

export default function CardList({ locationsData }) {
  return (
    <div className="container mx-auto pt-72 lg:px-20 xl:px-44">
      {locationsData.map((city) => {
        const hasEvents = city.locations.some(
          (location) => location.eventInfo.length > 0
        )
        if (!hasEvents) {
          return null // Skip rendering the city if it has no events
        }
        return (
          <div key={city.city}>
            <div className="mb-5 mt-7 flex items-center space-x-2">
              <h1 className="text-4xl font-black leading-none">{city.city}</h1>{" "}
            </div>
            {city.locations.map((location) => {
              if (location.eventInfo.length === 0) {
                return null // Skip rendering the location if it has no events
              }
              return (
                <div key={location.locationId}>
                  <div className="mb-5 mt-7 flex items-center space-x-2">
                    <h1 className="text-lg font-black leading-none">
                      {location.title}
                    </h1>{" "}
                    <Badge className="flex h-6 w-14 justify-center">
                      {location.locationId}
                    </Badge>
                  </div>
                  <div className="grid grid-flow-row gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {location.eventInfo.map((event) => (
                      <Card key={event.eventId}>
                        <CardHeader>
                          <div className="flex items-center text-lg">
                            <div className="w-8">
                              <Badge className="z-0 flex w-14 origin-center -translate-x-3 -rotate-90 justify-center">
                                {event.eventId}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-1 gap-2 w-full justify-center">
                              <div className="inline-flex items-center rounded-lg bg-secondary px-2.5 py-0.5 text-xs font-bold text-c">
                                {event.date}
                              </div>
                              <div className="inline-flex items-center rounded-lg bg-secondary px-2.5 py-0.5 text-xs font-semibold">
                                {event.eventCategory === 1
                                  ? "Season"
                                  : event.eventCategory === 2
                                  ? "Concert"
                                  : event.eventCategory === 3
                                  ? "Religious Event"
                                  : event.eventCategory === 4
                                  ? "Music Theater"
                                  : event.eventCategory}
                              </div>
                            </div>
                          </div>

                          {event.composerNamesArray &&
                            event.composerNamesArray.length > 0 && (
                              <div className="inline-flex items-center rounded-lg border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                <span>
                                  {event.composerNamesArray.map(
                                    (composer, index) => (
                                      <span key={composer.title}>
                                        {composer.title}
                                        {index <
                                          event.composerNamesArray.length - 1 &&
                                          " • "}
                                      </span>
                                    )
                                  )}
                                </span>
                              </div>
                            )}
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
