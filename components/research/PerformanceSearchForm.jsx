import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PerformanceSearchForm({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(searchTerm)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex content-center space-x-2 w-96"
    >
      <Input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for a performer"
      ></Input>
      <Button type="submit">Search</Button>
    </form>
  )
}
