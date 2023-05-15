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
      <div className="sticky top-[-5rem] pt-32 pb-5 bg-background">
        <h1 className="md:text-8xl text-6xl font-black pb-5">Who's the player?</h1>
        <PerformanceSearchForm onSubmit={handleSearch} />
      </div>
      <div className="mt-55">
        <Suspense fallback={<div>Loading...</div>}>
          <PerformanceSearchResults results={results} />
        </Suspense>
      </div>
    </section>
  )
}
