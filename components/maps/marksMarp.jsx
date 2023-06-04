import { AnimatePresence, motion as m } from "framer-motion"
import { groupBy } from "lodash"
import { Marker } from "react-simple-maps"

export default function MarksMap({
  locationsData,
  isHighQuality,
  selectedLocationId,
  setSelectedLocationId,
  isHover,
  setIsHover,
  mapConfig,
  filteredDataCountry,
}) {
  const sigmoid = (x) => {
    return 1 / (1 + Math.exp(-x))
  }

  const scaleRadius = (count) => {
    const minRadius = 1
    const maxRadius = mapConfig?.maxRadius || 10 // Use optional chaining to access maxRadius
    const scaleFactor = 5
    const x = (count - scaleFactor) / scaleFactor
    const radius = sigmoid(x) * (maxRadius - minRadius) + minRadius
    return radius
  }

  if (!locationsData || !Array.isArray(locationsData)) {
    return null // or some other fallback UI or error handling
  }

  // Wait until mapConfig.maxRadius is defined before rendering the component
  if (!mapConfig?.maxRadius) {
    return null
  }

  return (
    <>
      {filteredDataCountry.map(({ key, coordinates, count }) => {
        const transitionDuration = Math.floor(Math.random() * 900 + 100) / 2000 // Generate a random value between 0.1 and 1
        return (
          <Marker
            id={key}
            coordinates={coordinates}
            key={key}
            className={isHighQuality ? "drop-shadow" : ""}
          >
            <AnimatePresence mode={"wait"}>
              <m.circle
                layout
                initial={{ scale: 0 }}
                animate={
                  isHover
                    ? selectedLocationId === key
                      ? { scale: 1.5 }
                      : { scale: 0.2 }
                    : { scale: 1 }
                }
                transition={{
                  duration: transitionDuration,
                  delay: transitionDuration,
                }}
                key={key}
                exit={{ scale: 0 }}
                r={scaleRadius(count)}
                fill={
                  selectedLocationId === key ? "currentColor" : "currentColor"
                }
                onMouseEnter={() => {
                  setSelectedLocationId(key)
                  setIsHover(true)
                }}
                onMouseLeave={() => {
                  setSelectedLocationId(null)
                  setIsHover(false)
                }}
              />
            </AnimatePresence>
          </Marker>
        )
      })}
    </>
  )
}
