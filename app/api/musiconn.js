async function queryData(query) {
  const url = `http://localhost:3003/api/queryData?query=${query}`; // Updated relative URL with query parameter
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const records = await response.json(); // Use response instead of undefined variable res
  return records;
}

export { queryData };

async function GetCoordinates(locationUid) {
  const url = `http://localhost:3003/api/getCoordinates?locationUid=${locationUid}`; // Updated relative URL with locationUid parameter
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json(); // Use response instead of undefined variable res
}

export { GetCoordinates };

async function GetLocations(eventIud) {
  const url = `http://localhost:3003/api/getLocations?eventIud=${eventIud}`; // Updated relative URL with eventIud parameter
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json(); // Use response instead of undefined variable res
}

export { GetLocations };

async function GetInfoPerson(PersonUid) {
  const url = `http://localhost:3003/api/getInfoPerson?PersonUid=${PersonUid}`; // Updated relative URL with PersonUid parameter
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const person = await response.json(); // Use response instead of undefined variable res
  return person;
}

export { GetInfoPerson };

async function autocomplete(query) {
  const url = `http://localhost:3003/api/autocomplete?query=${query}`; // Updated relative URL with query parameter
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json(); // Use response instead of undefined variable res
}

export { autocomplete };
