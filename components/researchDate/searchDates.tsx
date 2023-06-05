import { useEffect, useState } from "react"
import { isValidDate } from "iso-datestring-validator"
import { set } from "lodash"

import { Button } from "@/components/ui/button"
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

interface SearchDatesProps {
  handleFromChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleToChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleDateSubmit: () => void
  fromValue: string
  toValue: string
  searchData: boolean
}

export default function SearchDates({
  handleFromChange,
  handleToChange,
  handleDateSubmit,
  fromValue,
  toValue,
  searchData,
}: SearchDatesProps) {
  const [fromValueIsValid, setFromValueIsValid] = useState(true)
  const [toValueIsValid, setToValueIsValid] = useState(true)

  useEffect(() => {
    if (isValidDate(fromValue)) {
      setFromValueIsValid(true)
    } else {
      setFromValueIsValid(false)
    }
  }, [fromValue])

  useEffect(() => {
    if (isValidDate(toValue)) {
      setToValueIsValid(true)
    } else {
      setToValueIsValid(false)
    }
  }, [toValue])

  return (
    <>
      {searchData ? null : (
        <CardHeader>
          <CardTitle>Search by Dates</CardTitle>
          <CardDescription>pick a date</CardDescription>
        </CardHeader>
      )}
      <CardContent
        className={`grid max-w-sm gap-1.5
          ${searchData ? "content-center p-0" : "items-center"}
            `}
      >
        {" "}
        <div className="grid grid-cols-2 gap-1">
          <div className="col-span-1 grid grid-cols-1 space-y-1">
            <CardDescription className="flex items-center justify-start">
              start date{" "}
              {fromValueIsValid && (
                <Icons.check className="h-4 text-green-600" />
              )}
            </CardDescription>
            <Input
              placeholder="yyyy-MM-dd"
              value={fromValue}
              onChange={handleFromChange}
            />
          </div>
          <div className="col-span-1 grid grid-cols-1 space-y-1">
            <CardDescription className="flex items-center justify-start">
              end date{" "}
              {toValueIsValid && <Icons.check className="h-4 text-green-600" />}
            </CardDescription>
            <Input
              placeholder="yyyy-MM-dd"
              value={toValue}
              onChange={handleToChange}
            />
          </div>
        </div>
        <Button className="col-span-1" type="submit" onClick={handleDateSubmit}>
          Search
        </Button>
      </CardContent>
    </>
  )
}
