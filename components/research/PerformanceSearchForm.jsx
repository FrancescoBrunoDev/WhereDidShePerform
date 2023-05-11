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
    <div className="">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="composer"
        ></Input>
        <Button type="submit">Search</Button>
      </form>
    </div>
  )
}
