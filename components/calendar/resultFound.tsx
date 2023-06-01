import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"

interface ResultFoundProps {
  dateUids: any[]
  startDate: string
  endDate: string
  searchData: boolean
  setResults: (results: any) => void
}

export default function ResultFound(props: ResultFoundProps) {
  const uids = props.dateUids.map((dateUids) => dateUids.uid)
  const uidString = uids.join("|")
  const timeFrame = `${props.startDate}|${props.endDate}`

  return (
    <>
      <CardHeader className={props.searchData ? "px-0 py-0" : "flex"}>
        <CardTitle className="flex justify-between align-middle text-2xl font-black">
          {props.searchData ? null : <h1>Good news!</h1>}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={
          props.searchData
            ? "flex h-full items-center justify-center p-0"
            : "flex h-28 items-center justify-center p-0"
        }
      >
        <Link href={`/date/${timeFrame}/${uidString}`}>
          <div className="flex gap-2">
            <Button size={"sm"}>
              I&apos;ve found {props.dateUids.length} events for you!
            </Button>
            <Button
              onClick={() =>
                props.setResults({
                  filteredEvents: [],
                  startDate: "",
                  endDate: "",
                })
              }
              variant={"destructive"}
              size={"sm"}
            >
              <Icons.undo className="h-5 w-5" />
              <span className="sr-only">undo reasearch</span>
            </Button>
          </div>
        </Link>
      </CardContent>
    </>
  )
}
