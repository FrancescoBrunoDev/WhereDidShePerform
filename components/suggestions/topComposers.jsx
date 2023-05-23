import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

import composerData from "./composerData.json"

export default function TopComposers() {
  const composers = composerData.composer

  // Create an array of composers sorted by count in descending order
  const sortedComposers = Object.entries(composers).sort(
    (a, b) => b[1].count - a[1].count
  )

  return (
    <Card className="w-fit">
      <CardHeader className="pb-2">
        <h2 className="text-2xl font-black">Most played composers</h2>
        <div className="flex justify-end font-black">played for</div>
      </CardHeader>
      <CardFooter className="flex h-64 flex-col">
        <ScrollArea className="h-full">
          {sortedComposers.map(([composerId, composer], index) => (
            <>
              <div className="flex-cols-2 flex justify-between">
                <div key={composerId} className="flex-cols-3 flex">
                  <h1 className="w-10 font-black">{index + 1}</h1>
                  <h2 className="pr-3 text-sm">{composer.title}</h2>
                </div>
                <h3 className="w-20 pr-3 text-right text-sm">
                  {composer.count}
                </h3>
              </div>
            </>
          ))}
        </ScrollArea>
        <span className="flex justify-end text-xs">last update 22/05/2023</span>
      </CardFooter>
    </Card>
  )
}
