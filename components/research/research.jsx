import { useState } from "react";
import { getData } from "../../app/api/musiconn";
import PerformanceSearchForm from "./PerformanceSearchForm";
import PerformanceSearchResults from "./PerformanceSearchResults";

export default function PerformanceSearch() {
  const [results, setResults] = useState([]);

  async function handleSearch(searchTerm) {
    try {
      const data = await getData(searchTerm);
      setResults([data]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="">
      <PerformanceSearchForm onSubmit={handleSearch} />
      <PerformanceSearchResults results={results} />
    </div>
  );
}
