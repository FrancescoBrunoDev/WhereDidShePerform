import React, { useEffect, useState } from "react"
import { motion as m } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { autocomplete } from "@/app/api/musiconn"

import { itemSearchBox, listSearchBox } from "../animationConst/animationConst"

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
    setIsScrollAreaVisible(true)
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
        {isScrollAreaVisible && suggestions.length > 0 && (
          <m.div
            initial="hidden"
            animate={isScrollAreaVisible ? "visible" : "hidden"}
            variants={listSearchBox}
          >
            <ScrollArea className="absolute mt-3 h-72 rounded-md border bg-background md:w-96">
              <m.div varians={itemSearchBox} className="p-4">
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
              </m.div>
            </ScrollArea>
          </m.div>
        )}
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}
