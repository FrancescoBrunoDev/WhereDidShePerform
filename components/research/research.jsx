import { useState, Suspense } from "react";

import { queryData } from "../../app/api/musiconn";
import PerformanceSearchForm from "./PerformanceSearchForm";
import PerformanceSearchResults from "./PerformanceSearchResults";

export default function PerformanceSearch() {
  const [results, setResults] = useState([]);

  async function handleSearch(searchTerm) {
    const data = await queryData(searchTerm);
    setResults([data]);
  }

  return (
    <div className="">
      <div className="">
        <PerformanceSearchForm onSubmit={handleSearch} />
      </div>
      <div className="">
        <Suspense fallback={<div>Loading...</div>}>
          <PerformanceSearchResults results={results} />
        </Suspense>
      </div>
    </div>
  );
}
