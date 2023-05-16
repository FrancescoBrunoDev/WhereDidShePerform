import { Suspense, useState } from "react"

import { queryData } from "../../app/api/musiconn"
import PerformanceSearchForm from "./PerformanceSearchForm"
import PerformanceSearchResults from "./PerformanceSearchResultsPerson"

export default function PerformanceSearch() {
  const [results, setResults] = useState([])

  async function handleSearch(searchTerm) {
    const data = await queryData(searchTerm)
    setResults([data])
  }

  return (
    <section className="">
      <div className="sticky top-[-5rem] bg-background pb-14 pt-32">
        <h1 className="pb-5 text-6xl font-black md:text-8xl">
          Who&apos;s the player?
        </h1>
        <PerformanceSearchForm onSubmit={handleSearch} />
      </div>
      <div className="pt-10">
        <Suspense fallback={<div>Loading...</div>}>
          <PerformanceSearchResults results={results} />
        </Suspense>
      </div>
    </section>
  )
}
