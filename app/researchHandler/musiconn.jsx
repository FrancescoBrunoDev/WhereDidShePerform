async function getData() {
  const res = await fetch(
    "https://performance.musiconn.de/api?action=query&person=88&format=json"
  );

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export { getData };
