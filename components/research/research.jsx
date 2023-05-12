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
      <div className="sticky top-40">
        <h1 className="text-8xl font-black pb-5">Who's the player?</h1>
        <PerformanceSearchForm onSubmit={handleSearch} />
      </div>
      <div className="mt-60">
        <Suspense fallback={<div>Loading...</div>}>
          <PerformanceSearchResults results={results} />
        </Suspense>
      </div>
    </section>
  )
}
