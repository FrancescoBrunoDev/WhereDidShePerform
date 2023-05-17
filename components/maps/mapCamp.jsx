import { useEffect, useState } from "react"
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  useTransition,
} from "@react-spring/web"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

import { buttonVariants } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Icons } from "@/components/icons"

const geoUrl =
  "https://raw.githubusercontent.com/leakyMirror/map-of-europe/27a335110674ae5b01a84d3501b227e661beea2b/TopoJSON/europe.topojson"

const worldUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export default function MapCamp({
  locationsData,
  isHover,
  setIsHover,
  selectedLocationId,
  setSelectedLocationId,
}) {
  // handle map switch
  const [mapUrl, setMapUrl] = useState(geoUrl) // Initial map URL is geoUrl
  const [isHighQuality, setIsHighQuality] = useState(true) // Track the current map type
  const [isEuropeMap, setIsGeoMap] = useState(true) // Track the current map type
  // map size based on screen size
  const [mapConfig, setMapConfig] = useState({
    scale: 850,
    center: [-3, 0],
    maxZoom: 1,
    maxRadius: 10,
  })

  const handleHighQualitySwitch = () => {
    setIsHighQuality((prevIsHighQuality) => !prevIsHighQuality) // Toggle the map type
  }

  // handle map switch
  const handleMapSwitch = () => {
    setTimeout(() => {
      setIsGeoMap((prevIsGeoMap) => !prevIsGeoMap) // Toggle the map type
    }, 100)
  }

  const fadeIn = useSpring({ from: { opacity: 0 }, to: { opacity: 1 } })
  const fadeOut = useSpring({ from: { opacity: 1 }, to: { opacity: 0 } })

  useEffect(() => {
    // Update the map URL based on the current map type
    setMapUrl(isEuropeMap ? geoUrl : worldUrl)
  }, [isEuropeMap])

  // a function that makes the number of events in a location proportional to the radius of the circle
  const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x))
  }
  const scaleRadius = (count) => {
    const minRadius = 2
    const maxRadius = mapConfig.maxRadius
    const scaleFactor = 5
    const x = (count - scaleFactor) / scaleFactor
    const radius = sigmoid(x) * (maxRadius - minRadius) + minRadius
    return radius
  }

  useEffect(() => {
    const updateMapConfig = () => {
      // Get the width of the screen
      const screenWidth = window.innerWidth

      // Calculate the scale, center, and maxZoom based on the screen width and isEuropeMap value
      let newScale, newCenter, newMaxZoom
      let newMaxRadius = mapConfig.maxRadius
      let newIsHighQuality = isHighQuality

      if (isEuropeMap) {
        if (screenWidth < 768) {
          newScale = 1400
          newCenter = [4, 9]
          newMaxZoom = 1.5
          newMaxRadius = 8
        } else if (screenWidth < 1024) {
          newScale = 1400
          newCenter = [4, 9]
          newMaxZoom = 1.5
        } else {
          newScale = 850
          newCenter = [-3, 0]
          newMaxZoom = 1
          newMaxRadius = 10
        }

        // Check the number of points and update the isHighQuality state
        if (locationsData.length < 50) {
          newIsHighQuality = true
        } else {
          newIsHighQuality = false
        }
        // Different configuration for non-Europe Map
        // Adjust these values according to your requirements
      } else {
        if (screenWidth < 768) {
          newScale = 150
          newCenter = [0, 0]
          newMaxZoom = 2
          newMaxRadius = 5
        } else {
          newScale = 150
          newCenter = [-60, 0]
          newMaxZoom = 2
          newMaxRadius = 5 // Adjust the maximum radius for non-Europe Map
        }
      }

      // Update the map configuration state
      setMapConfig({
        scale: newScale,
        center: newCenter,
        maxZoom: newMaxZoom,
        maxRadius: newMaxRadius,
      })
      setIsHighQuality(newIsHighQuality)
    }

    // Call the updateMapConfig function initially and add a resize event listener
    updateMapConfig()
    window.addEventListener("resize", updateMapConfig)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateMapConfig)
    }
  }, [isEuropeMap, locationsData.length, mapConfig.maxRadius])

  const { scale, center, maxZoom } = mapConfig

  return (
    <div className="">
      <div className="container z-50 flex justify-end">
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
            <div className="w-40">
              <div className="mb-2 grid grid-cols-2 items-center space-x-2">
                <Label>{isEuropeMap ? "World Map" : "Europe Map"}</Label>
                <Switch
                  className="data-[state=unchecked]:bg-primary"
                  onClick={handleMapSwitch}
                />
              </div>
              <div className=" grid grid-cols-2 items-center space-x-2">
                {" "}
                {/* set the a drop shadow effect */}
                <Label>Marker Shadow</Label>
                <Switch
                  defaultChecked={isHighQuality} // Set the checked state based on isHighQuality
                  onClick={handleHighQualitySwitch}
                />
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <animated.div style={fadeIn} className="h-[80vh] w-screen cursor-move">
        <ComposableMap
          className="h-[80vh] w-screen"
          projection={isEuropeMap ? "geoAzimuthalEquidistant" : undefined}
          projectionConfig={{
            rotate: isEuropeMap ? [-10.0, -52.0, 0] : [-10, 0, 0],
            center: center,
            scale: scale,
          }}
        >
          {/* <ZoomableGroup zoom={1} maxZoom={maxZoom}> */}
          <Geographies geography={mapUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  fill="rgb(4, 7, 17)"
                  stroke="white"
                  strokeWidth="0.4"
                  geography={geo}
                />
              ))
            }
          </Geographies>
          {locationsData.map(({ locationId, coordinates, count }) => {
            const transitionDuration =
              Math.floor(Math.random() * 900 + 100) / 1000 // Generate a random value between 0.1 and 1

            return (
              <Marker
                id={locationId}
                coordinates={coordinates}
                key={locationId}
                className={isHighQuality ? "drop-shadow" : ""}
              >
                <circle
                  r={scaleRadius(count)}
                  fill={selectedLocationId === locationId ? "white" : "white"}
                  style={{
                    transition: `transform ${transitionDuration}s`,
                    transform:
                      isHover && selectedLocationId === locationId
                        ? "scale(1.5)"
                        : isHover
                        ? "scale(0.2)"
                        : "scale(1)",
                  }}
                  onMouseEnter={() => {
                    setSelectedLocationId(locationId)
                    setIsHover(true)
                  }}
                  onMouseLeave={() => {
                    setSelectedLocationId(null)
                    setIsHover(false)
                  }}
                />
              </Marker>
            )
          })}
          {/* </ZoomableGroup> */}
        </ComposableMap>
      </animated.div>
    </div>
  )
}
