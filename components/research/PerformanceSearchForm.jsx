import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { autocomplete } from "@/app/api/musiconn"

export default function PerformanceSearchForm({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [isScrollAreaVisible, setIsScrollAreaVisible] = useState(true)

  useEffect(() => {
    if (searchTerm) {
      const fetchSuggestions = async () => {
        try {
          const suggestions = await autocomplete(searchTerm)
          setSuggestions(suggestions || [])
        } catch (error) {
          console.error(error)
        }
      }
      fetchSuggestions()
    } else {
      setSuggestions([])
    }
  }, [searchTerm])

  function handleInputChange(event) {
    const newSearchTerm = event.target.value
    setSearchTerm(newSearchTerm)
  }

  function handleSuggestionClick(suggestion) {
    setSearchTerm(suggestion)
    setSuggestions([])
    setIsScrollAreaVisible(false)
    onSubmit(suggestion) // Trigger the search with the clicked suggestion
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(searchTerm)
    setSearchTerm("")
    setIsScrollAreaVisible(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex content-center space-x-2"
    >
      <div className="realtive w-full md:w-96">
        <Input
          className="w-full md:w-96"
          type="text"
          value={searchTerm}
          onChange={(event) => handleInputChange(event)}
          placeholder="Search for a performer"
        />
        {isScrollAreaVisible && suggestions.length > 0 && (
          <ScrollArea className="absolute mt-3 h-72 rounded-md border md:w-96">
            <div className="p-4">
              {suggestions.map((suggestion, index) => (
                <p
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion[0])}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {suggestion[0]}
                  <Separator className="my-2" />
                </p>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}
