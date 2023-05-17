import { Suspense } from "react"
import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Loading } from "@/components/loading"

export default function PerformanceSearchResults({ results }) {
  if (!results || results.length === 0 || !results[0].person) {
    return <p>No results found.</p>
  }

  const content = Object.keys(results[0].person).map((personId) => {
    const person = results[0].person[personId]
    const event = results[0].person[personId].events.count

    return (
      <Link key={person.uid} href={`/${person.uid}/`}>
        <Card key={person.uid}>
          <CardHeader>{person.title}</CardHeader>
          <CardFooter className="gap-x-1">
            <Badge>Events {event}</Badge>
            <Badge variant="secondary">{person.uid}</Badge>
          </CardFooter>
        </Card>
      </Link>
    )
  })

  return (
    <div className="grid grid-flow-row place-content-stretch gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Suspense fallback={<Loading />}>{content}</Suspense>
    </div>
  )
}
