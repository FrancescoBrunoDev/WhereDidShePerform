
import RandomCard from "./randomCard"
import { TopPersons } from "./topPersons"

export default function Suggestions() {

  return (
    <div className="flex snap-x scroll-pl-6 flex-nowrap gap-4 overflow-x-auto pt-1">
      <TopPersons />
      <RandomCard />
    </div>
  )
}
