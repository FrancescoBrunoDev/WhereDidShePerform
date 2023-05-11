async function queryData(query) {
  const url = `https://performance.musiconn.de/api?action=query&person=${query}&entity=location&format=json`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const { records } = await res.json()
  return records
}

export { queryData }

async function GetCoordinates({uid, setCoordinates}) {
  const url = `https://performance.musiconn.de/api?action=get&location=${uid}&format=json`
  
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const data = await res.json()
  const { geometries } = data.location[uid]
  if (geometries && geometries.length > 0) {
    const [lat, lng] = geometries[0].geo
    console.log(`Latitude: ${lat}, Longitude: ${lng}`)
    setCoordinates(prevState => ({...prevState, [uid]: { lat, lng }}))
    return { lat, lng }
  } else {
    console.log("No coordinates found")
    setCoordinates(prevState => ({...prevState, [uid]: null}))
    return null
  }
}

export { GetCoordinates }


async function* getAllData(query) {
  let page = 1
  let allRecords = []

  while (true) {
    const url = `https://performance.musiconn.de/api?action=query&person=${query}&page=${page}&entity=event&format=json`
    const res = await fetch(url)

    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }

    const { records } = await res.json()
    allRecords = allRecords.concat(records)

    if (records.length === 0) {
      // No more records on this page, we're done
      break
    }

    page++
  }

  yield allRecords
}

export { getAllData }

async function autocomplete(query) {
  const url = `https://performance.musiconn.de/api?action=autocomplete&person=${query}&format=json`
  const res = await fetch(url)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  const { autocomplete } = await res.json()
  return autocomplete
}

export { autocomplete }
