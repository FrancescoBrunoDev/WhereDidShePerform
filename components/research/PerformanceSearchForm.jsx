import React, { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { autocomplete } from "@/app/api/musiconn"
import { useClickOutside } from '@mantine/hooks';

export default function PerformanceSearchForm({ onSubmit }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

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
    setOpened(true)
  }

  function handleSuggestionClick(suggestion) {
    setSearchTerm(suggestion)
    setSuggestions([])
    setOpened(false)
    onSubmit(suggestion) // Trigger the search with the clicked suggestion
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(searchTerm)
    setSearchTerm("")
    setOpened(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute flex w-full content-center space-x-2  pb-5"
    >
      <div className="realtive w-full md:w-96">
        <Input
          className="w-full md:w-96"
          type="text"
          value={searchTerm}
          onChange={(event) => handleInputChange(event)}
          placeholder="Search for a performer"
        />
        {opened && (
          <ScrollArea ref={ref} className="absolute mt-3 h-72 rounded-md border bg-background md:w-96">
            <div className="p-4">
              {suggestions.map((suggestion, index) => (
                <div
                  className="rounded-lg p-2 hover:bg-secondary"
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion[0])}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  {suggestion[0]}
                  {/* <Separator className="my-2" /> */}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}
