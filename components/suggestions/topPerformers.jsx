
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import statistic from "./statistic.json";

export default function TopPerfomers() {
  const performer = statistic.topPerformers;

  // Create an array of composers sorted by count in descending order
  const sortedPerformer = performer.sort((a, b) => b.count - a.count);

  return (
    <Card className="w-fit">
      <CardHeader className="pb-2">
        <h2 className="text-2xl font-black">Most active performers</h2>
        <div className="flex justify-end font-black">played for</div>
      </CardHeader>
      <CardFooter className="flex h-64 flex-col">
        <ScrollArea className="h-full">
          {sortedPerformer.map(({ performerId, performerName, count }, index) => (
            <div key={performerId} className="flex-cols-2 flex justify-between">
              <div className="flex-cols-3 flex">
                <h1 className="w-10 font-black">{index + 1}</h1>
                <h2 className="pr-3 text-sm">{performerName}</h2>
              </div>
              <h3 className="w-20 pr-3 text-right text-sm">{count}</h3>
            </div>
          ))}
        </ScrollArea>
        <span className="flex justify-end text-xs pt-2">last update 24/05/2023</span>
      </CardFooter>
    </Card>
  );
}
