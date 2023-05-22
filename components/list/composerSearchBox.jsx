import { useState } from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  getAvailableComposers,
} from "@/components/list/filterLocationsData"

export function ComposerSearchBox({ locationsData, setSelectedComposerNames, selectedComposerNames}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])

  const availableComposers = getAvailableComposers(locationsData)

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value
    setSearchQuery(newSearchQuery)

    const matchedSuggestions = availableComposers.filter((composer) =>
      composer.title.toLowerCase().startsWith(newSearchQuery.toLowerCase())
    )
    setSuggestions(matchedSuggestions)
  }

  return (
    <div className="flex-cols-2 flex content-center space-x-2 pb-5">
      <div className="static">
        <Input
          placeholder="Composer"
          value={searchQuery}
          onChange={handleInputChange}
          className=" md:w-72"
        />
        {suggestions.length > 0 && (
          <ScrollArea className="absolute mt-5 h-72 w-40 rounded-md border bg-background md:w-72">
            <div className="p-4">
              {selectedComposerNames.length > 0 &&
                selectedComposerNames.map((name) => (
                  <div
                    key={name}
                    className="flex items-center space-x-2 rounded-lg p-2 hover:bg-secondary"
                  >
                    <Checkbox
                      id="composer"
                      name={name}
                      checked={true}
                      onCheckedChange={() => {
                        setSelectedComposerNames((prevNames) =>
                          prevNames.filter((n) => n !== name)
                        )
                        setSearchQuery("") // Clear the search query
                      }}
                    />
                    <Label htmlFor="composer">{name}</Label>
                  </div>
                ))}

              {selectedComposerNames.length > 0 && (
                <Separator className="my-2" />
              )}

              {suggestions.map(
                (suggestion) =>
                  !selectedComposerNames.includes(suggestion.title) && (
                    <div
                      className="flex items-center space-x-2 rounded-lg p-2 hover:bg-secondary"
                      key={suggestion.title}
                      style={{ cursor: "pointer" }}
                    >
                      <Checkbox
                        id="composer"
                        name={suggestion.title}
                        checked={selectedComposerNames.includes(
                          suggestion.title
                        )}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedComposerNames((prevNames) => [
                              ...prevNames,
                              suggestion.title,
                            ])
                          } else {
                            setSelectedComposerNames((prevNames) =>
                              prevNames.filter((n) => n !== suggestion.title)
                            )
                          }
                          setSearchQuery("") // Clear the search query
                        }}
                      />
                      <Label htmlFor="composer">{suggestion.title}</Label>
                    </div>
                  )
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  )
}
