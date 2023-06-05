import { AnimatePresence, motion as m } from "framer-motion"

import { buttonVariants } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

export default function MenuMap({
  setChangeMap,
  changeMap,
  setIsGeoMap,
  setIsHighQuality,
  isHighQuality,
  isEuropeMap,
  thereIsMoreInWorld,
  thereIsMoreInWorldPopup,
}) {
  return (
    <div className="flex">
      {thereIsMoreInWorld && thereIsMoreInWorldPopup && isEuropeMap ? (
        <AnimatePresence>
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            type={"button"}
            size={"sm"}
            variant={"outline"}
            className="mr-3 rounded-lg bg-secondary px-3 py-2 text-sm shadow-lg"
          >
            Hey! There is more to see in the world 👉
          </m.div>
        </AnimatePresence>
      ) : null}
      <Popover openDelay={200}>
        <PopoverTrigger>
          <div
            className={buttonVariants({
              size: "sm",
              variant: "ghost",
            })}
          >
            <Icons.settings className="h-5 w-5" />
            <span className="sr-only">settings</span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid w-40 grid-cols-1 gap-y-2">
            <div className="grid grid-cols-2 items-center space-x-2 ">
              <Label>{isEuropeMap ? "World Map" : "Europe Map"}</Label>
              <Switch
                disabled={!thereIsMoreInWorld && isEuropeMap}
                className="data-[state=checked]:bg-input"
                onCheckedChange={() => {
                  setChangeMap(changeMap + 1)
                  setTimeout(() => {
                    setIsGeoMap((prevIsGeoMap) => !prevIsGeoMap)
                  }, 100)
                }}
                checked={isEuropeMap}
              />
            </div>
            <div className="grid grid-cols-2 items-center space-x-2">
              {" "}
              {/* set the a drop shadow effect */}
              <Label>Marker Shadow</Label>
              <Switch
                onCheckedChange={() => {
                  setIsHighQuality((prevIsHighQuality) => !prevIsHighQuality)
                }}
                checked={isHighQuality}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
