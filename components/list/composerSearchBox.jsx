import { useState } from "react"
import { useClickOutside } from "@mantine/hooks"
import { motion as m } from "framer-motion"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { item, list } from "@/components/animationConst/animationConst"
import { getAvailableComposers } from "@/components/list/filterLocationsData"

export function ComposerSearchBox({
  locationsData,
  setSelectedComposerNames,
  selectedComposerNames,
}) {
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [opened, setOpened] = useState(false)
  const ref = useClickOutside(() => setOpened(false))

  const availableComposers = getAvailableComposers(locationsData)

  const handleInputChange = (event) => {
    const newSearchQuery = event.target.value
    setSearchQuery(newSearchQuery)

    const matchedSuggestions = availableComposers.filter((composer) =>
      composer.title.toLowerCase().startsWith(newSearchQuery.toLowerCase())
    )
    setSuggestions(matchedSuggestions)
    setOpened(true)
  }

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0 },
      }}
      className="flex-cols-2 flex content-center space-x-2 pb-5"
    >
      <div className="static w-48 sm:w-64 md:w-72">
        <Input
          placeholder="Composer"
          value={searchQuery}
          onChange={handleInputChange}
          onClick={() => setOpened(true)}
          className=""
        />
        {opened && suggestions.length > 0 && (
          <m.div
            ref={ref}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0.5, y: -0.5 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <ScrollArea className="absolute mt-5 h-72 rounded-md border bg-background">
              <m.div className="p-4">
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
                        variants={item}
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
              </m.div>
            </ScrollArea>
          </m.div>
        )}
      </div>
    </m.div>
  )
}
