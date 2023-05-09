async function getData(personId) {
  const url = `https://performance.musiconn.de/api?action=query&person=${personId}&entity=event&format=json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { records } = await res.json();
  return records;
}

export { getData };

async function autocomplete(query) {
  const url = `https://performance.musiconn.de/api?action=autocomplete&person=${query}&format=json`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const { autocomplete } = await res.json();
  return autocomplete;
}

export { autocomplete };