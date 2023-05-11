import { useState, Suspense } from "react";

import { queryData } from "../../app/api/musiconn";
import PerformanceSearchForm from "./PerformanceSearchForm";
import PerformanceSearchResults from "./PerformanceSearchResults";

function PerformanceSearchWrapper(props) {
  const [coordinates, setCoordinates] = useState({});
  
  return (
    <PerformanceSearchResults
      {...props}
      coordinates={coordinates}
      setCoordinates={setCoordinates}
    />
  );
}

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
          <PerformanceSearchWrapper results={results} />
        </Suspense>
      </div>
    </div>
  );
}
