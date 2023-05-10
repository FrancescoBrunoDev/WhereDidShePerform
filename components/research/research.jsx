import { useState } from "react"

import { queryData } from "../../app/api/musiconn"
import PerformanceSearchForm from "./PerformanceSearchForm"
import PerformanceSearchResults from "./PerformanceSearchResults"

export default function PerformanceSearch() {
  const [results, setResults] = useState([])

  async function handleSearch(searchTerm) {
    try {
      const data = await queryData(searchTerm)
      setResults([data])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="">
      <div className="">
        <PerformanceSearchForm onSubmit={handleSearch} />
      </div>
      <div className="">
        <PerformanceSearchResults results={results} />
      </div>
    </div>
  )
}
