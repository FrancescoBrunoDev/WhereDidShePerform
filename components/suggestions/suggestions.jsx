import { Suspense } from "react"

import { Loading } from "@/components/loading"

import RandomCard from "./randomCard"
import TopComposers from "./topComposers"

export default function suggestions() {
  return (
    <div className="flex flex-nowrap gap-4">
      <TopComposers />

      <RandomCard />
    </div>
  )
}
