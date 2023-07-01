import { useStoreFiltersMap } from "@/store/useStoreFiltersMap"
import { useStoreSettingMap } from "@/store/useStoreSettingMap"
import { Marker } from "react-simple-maps"

export default function MarksMap({
  mapConfig,
}) {
  const isEuropeMap = useStoreSettingMap((state) => state.isEuropeMap)
  const isHighQuality = useStoreSettingMap((state) => state.isHighQuality)

  const filteredDataCountry = useStoreFiltersMap(
    (state) => state.filteredDataCountry
  )

  const scaleRadius = (count) => {
    const minRadius = 2 // Minimum radius value
    const maxRadius = mapConfig.maxRadius || 30 // Maximum radius value (default is 30)
    const scaleFactor = 2 // Scaling factor (adjust as needed)
    const logCount = Math.log10(count + 1) // Logarithm of count value (add 1 to avoid taking log of 0)
    const radius =
      (logCount / scaleFactor) * (maxRadius - minRadius) + minRadius // Map log count value to radius range
    return radius
  }

  const [isHover, setIsHover] = useStoreSettingMap((state) => [
    state.isHover,
    state.setIsHover,
  ])

  // Wait until mapConfig.maxRadius is defined before rendering the component
  if (!mapConfig?.maxRadius) {
    return null
  }

  return (
    <>
      {filteredDataCountry.map(
        ({ key, coordinates, count, coordinatesCountry }) => {
          const transitionDuration =
            Math.floor(Math.random() * 900 + 100) / 2000 // Generate a random value between 0.1 and 1
          return (
            <Marker
              id={key}
              coordinates={isEuropeMap ? coordinates : coordinatesCountry}
              key={key}
              className={isHighQuality ? "drop-shadow" : ""}
            >
              <circle
                style={{
                  transition: `transform ${transitionDuration}s ease-in-out`,
                  transform: isHover
                    ? isHover === key
                      ? "scale(1.5)"
                      : "scale(0.2)"
                    : "scale(1)",
                }}
                exit={{ scale: 0 }}
                r={scaleRadius(count)}
                fill="currentColor"
                onMouseEnter={() => {
                  setIsHover(key)
                }}
                onMouseLeave={() => {
                  setIsHover(null)
                }}
              />
            </Marker>
          )
        }
      )}
    </>
  )
}
