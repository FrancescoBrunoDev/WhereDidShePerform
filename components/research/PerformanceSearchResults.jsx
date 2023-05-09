export default function PerformanceSearchResults({ results }) {
  console.log(results);
  if (!results || results.length === 0 || !results[0].event) {
    return <p>No results found.</p>;
  }

  return (
    <div className="flex flex-col w-96 py-10">
      {Object.keys(results[0].event).map((eventId) => {
        const event = results[0].event[eventId];
        return (
          <div key={event.uid}>
            <h2>{event.title}</h2>
            <p>{event.dates[0].date}</p>
          </div>
        );
      })}
    </div>
  );
}
