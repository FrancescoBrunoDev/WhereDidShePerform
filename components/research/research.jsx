import { Suspense, useState } from "react"

import { queryData } from "../../app/api/musiconn"
import PerformanceSearchForm from "./PerformanceSearchForm"
import PerformanceSearchResults from "./PerformanceSearchResults"

export default function PerformanceSearch() {
  const [results, setResults] = useState([])

  async function handleSearch(searchTerm) {
    const data = await queryData(searchTerm)
    setResults([data])
  }

  return (
    <section className="px-0 md:px-20 xl:px-40">
      <div className="sticky top-[-5rem] z-10 pb-14 pt-32">
        <h1 className="pb-5 text-6xl font-black md:text-8xl">
          Who&apos;s the performer?
        </h1>
        <PerformanceSearchForm onSubmit={handleSearch} />
      </div>
      <div className="pt-10 -z-10">
        <Suspense fallback={<div>Loading...</div>}>
          <PerformanceSearchResults results={results} />
        </Suspense>
      </div>
    </section>
  )
}
