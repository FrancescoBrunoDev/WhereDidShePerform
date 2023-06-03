const geolib = require("geolib")
const worldData = require("@/public/countries-land-10km.geo.json")

function getCountryFromCoordinates(longitude, latitude) {
  // Function to determine the country for a given point
  function getCountry(point, geojsonData) {
    const [longitude, latitude] = point
    for (const feature of geojsonData.features) {
      if (feature.geometry?.type === "MultiPolygon") {
        for (const polygon of feature.geometry.coordinates) {
          if (geolib.isPointInPolygon({ longitude, latitude }, polygon[0])) {
            return feature.properties.A3
          }
        }
      } else if (feature.geometry?.type === "Polygon") {
        if (
          geolib.isPointInPolygon(
            { longitude, latitude },
            feature.geometry.coordinates[0]
          )
        ) {
          return feature.properties.A3
        }
      }
    }

    return "Unknown"
  }

  // Determine the country for the point
  const country = getCountry([longitude, latitude], worldData)
  return country
}

export { getCountryFromCoordinates }

