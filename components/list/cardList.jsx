import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"

export default function CardList({ locationsData }) {
  console.log("locationsData", locationsData)
  return (
    <div className="container mx-auto mt-32 lg:px-20 xl:px-44">
      {locationsData.map((city) => {
        console.log(locationsData)
        return (
          <div key={city.city}>
            <div className="mb-5 mt-7 flex items-center space-x-2">
              <h1 className="text-4xl font-black leading-none">{city.city}</h1>{" "}
            </div>
            {city.locations.map((location) => (
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
                        <Badge variant="secondary">
                          eventId: {event.eventId}
                        </Badge>
                        <Badge variant="secondary">date: {event.date}</Badge>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}
