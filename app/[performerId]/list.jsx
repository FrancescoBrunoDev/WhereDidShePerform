import CardList from "@/components/list/cardList"

export async function List({ locationsData }) {
  return (
    <section className="mb-10 lg:container">
      <h1 className="sticky top-40 flex justify-end text-4xl font-black leading-none">
        Menu
      </h1>
      <CardList locationsData={locationsData} />
    </section>
  )
}
