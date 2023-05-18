import { buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

export default function MenuMap({
  setChangeMap,
  changeMap,
  setIsGeoMap,
  setIsHighQuality,
  isHighQuality,
  setIsByCity,
  isEuropeMap,
  isByCity,
}) {
  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger>
        <div
          className={buttonVariants({
            size: "sm",
            variant: "ghost",
          })}
        >
          <Icons.settings className="h-5 w-5" />
          <span className="sr-only">settings</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="grid w-40 grid-cols-1 gap-y-2">
          <div className="grid grid-cols-2 items-center space-x-2 ">
            <Label>{isEuropeMap ? "World Map" : "Europe Map"}</Label>
            <Switch
              className="data-[state=unchecked]:bg-primary"
              onCheckedChange={() => {
                setChangeMap(changeMap + 1)
                setTimeout(() => {
                  setIsGeoMap((prevIsGeoMap) => !prevIsGeoMap)
                }, 100)
              }}
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
              defaultChecked={isHighQuality} // Set the checked state based on isHighQuality
            />
          </div>
          <div className="grid grid-cols-2 items-center space-x-2">
            {" "}
            {/* set the a drop shadow effect */}
            <Label>Sorted by{isByCity ? " City" : " Place"}</Label>
            <Switch
              className="data-[state=unchecked]:bg-primary"
              defaultChecked={isByCity} // Set the checked state based on isByCity
              onCheckedChange={() => {
                setIsByCity((prevIsByCity) => !prevIsByCity)
              }}
            />
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
