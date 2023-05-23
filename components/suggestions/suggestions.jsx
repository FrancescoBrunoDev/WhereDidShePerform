import { Suspense } from "react"

import { Loading } from "@/components/loading"

import RandomCard from "./randomCard"
import TopComposers from "./topComposers"

export default function suggestions() {
  return (
    <div className="flex snap-x scroll-pl-6 flex-nowrap gap-4 overflow-x-auto">
      <TopComposers />

      <RandomCard />
    </div>
  )
}
