import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader } from "@/components/ui/card"
import { GetMergedLocations } from "@/components/maps/getMergedLocations"

export async function List({ id }) {
  const mergedLocations = await GetMergedLocations(id)
  return (
    <section>
      <div className="container mx-auto xl:px-44 lg:px-20 grid lg:grid-cols-4 md:grid-cols-3 grid-flow-row gap-4 mt-32">
        {mergedLocations.map((location) => (
          <Card key={`${location.eventId}-${location.locationId}`}>
            <CardHeader>
              <Badge variant="secondary">eventId: {location.eventId}</Badge>
              <Badge variant="secondary">
                title: {location.title}, locationId: {location.locationId}
              </Badge>
              <Badge
                variant={location.coordinates ? "secondary" : "destructive"}
              >
                coordinates:{" "}
                {location.coordinates
                  ? `${location.coordinates[0]}, ${location.coordinates[1]}`
                  : "null"}
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}
