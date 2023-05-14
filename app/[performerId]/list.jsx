import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"

export async function List({ locationsData }) {
  console.log(locationsData)
  return (
    <section>
      <div className="container mx-auto xl:px-44 lg:px-20  mt-32">
        {locationsData.map((location) => (
          <div key={location.locationId}>
            <div className="flex mt-7 mb-5 space-x-2">
              <h1 className="text-2xl font-black leading-none">
                {location.title}
              </h1>{" "}
              <Badge className="w-14 flex justify-center">
                {location.locationId}
              </Badge>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-flow-row gap-4">
              {location.eventInfo.map(
                (event) => (
                  console.log(event),
                  (
                    <Card key={event.eventId}>
                      <CardHeader>
                        <Badge variant="secondary">
                          eventId: {event.eventId}
                        </Badge>
                        <Badge variant="secondary">
                          date: {event.date}
                        </Badge>
                      </CardHeader>
                    </Card>
                  )
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
