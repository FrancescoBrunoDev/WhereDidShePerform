import RandomCard from "./randomCard"
import TopPerfomers from "./topPerformers"
import { TopPersons } from "./topPersons"

export default function Suggestions() {
  return (
    <div className="flex snap-x scroll-pl-6 flex-nowrap gap-4 overflow-x-scroll pt-1 pr-10">
      <TopPersons />
      <TopPerfomers />
      <RandomCard />
    </div>
  )
}
