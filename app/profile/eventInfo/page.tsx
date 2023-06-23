"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { isValid } from "date-fns"

import { NewEventPayload } from "@/lib/validators/newEvent"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import InputAutosuggest from "@/components/create/inputAutosuggest"
import { Icons } from "@/components/icons"

interface Person {
  title: string
  mUid: string
}

interface Work {
  title: string
  mUid: string
}

const Page = () => {
  const router = useRouter()
  const [dataFormat, setDataFormat] = useState<boolean>()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: null as Date | null,
    location: "",
    persons: [] as Person[],
    works: [] as Work[],
  })

  const { mutate: createEvent, isLoading } = useMutation({
    mutationFn: async () => {
      const dateValue: string = formData.date ? formData.date.toISOString() : "" // Use an empty string as the default value

      const payload: NewEventPayload = {
        title: formData.title,
        category: formData.category,
        date: dateValue,
        location: formData.location,
        persons: formData.persons,
        works: formData.works,
      }

      const { data } = await axios.post("/api/create/createEvent", payload)
      return data as string
    },
  })

  console.log(formData)

  const handleAddPerson = (value: [string, string, string]) => {
    const newMUid = value[2]
    const mUidExists = formData.persons.some(
      (person) => person.mUid === newMUid
    )
    if (!mUidExists) {
      const newPerson = { title: value[0], mUid: newMUid }
      const newPersons = [...formData.persons, newPerson]
      setFormData({
        ...formData,
        persons: newPersons,
      })
    }
  }

  const handleRemovePerson = (title: string) => {
    const newPersons = formData.persons.filter(
      (person) => person.title !== title
    )
    setFormData({
      ...formData,
      persons: newPersons,
    })
  }

  const handleAddWork = (value: [string, string, string]) => {
    const newMUid = value[2]
    const mUidExists = formData.works.some((work) => work.mUid === newMUid)
    if (!mUidExists) {
      const newWork = { title: value[0], mUid: newMUid }
      const newWorks = [...formData.works, newWork]
      setFormData({
        ...formData,
        works: newWorks,
      })
    }
  }

  const handleRemoveWork = (title: string) => {
    const newWorks = formData.works.filter((work) => work.title !== title)
    setFormData({
      ...formData,
      works: newWorks,
    })
  }

  return (
    <div className="py h-fit">
      <div className="mx-4 flex w-full flex-col gap-16">
        <Input
          className="-mx-4 h-20 w-full border-none text-7xl font-black"
          placeholder="Event Name"
          name={"title"}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-10">
          <h2 className="col-span-3 pt-2 text-5xl font-black">General Data</h2>
          <div className="col-span-7 flex max-w-xl flex-col gap-4">
            <div className="flex w-full items-center gap-4">
              <span className="shrink-0 text-7xl font-black">1</span>
              <span className="shrink-0 text-lg font-bold uppercase">
                select a category
              </span>
              <Select
                onValueChange={(e) => setFormData({ ...formData, category: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="cathegory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Season">Season</SelectItem>
                  <SelectItem value="Concert">Concert</SelectItem>
                  <SelectItem value="Religious_Event">
                    Religious Event
                  </SelectItem>
                  <SelectItem value="Music_Theater">Music Theater</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="relative flex w-full items-center gap-4">
              <span className="text-7xl font-black">2</span>
              <span className="shrink-0 text-lg font-bold uppercase">
                Date of the Event
              </span>
              <Input
                placeholder="yyyy-MM-dd"
                onChange={(e) => {
                  const inputDate = new Date(e.target.value)
                  const isDateValid = isValid(inputDate)
                  if (!isDateValid) {
                    setFormData({ ...formData, date: null })
                    setDataFormat(false)
                  }
                  if (isDateValid) {
                    setFormData({ ...formData, date: inputDate })
                    setDataFormat(true)
                  }
                }}
              />
              {dataFormat ? (
                <Icons.check className="absolute -right-8 h-4 shrink-0 text-green-600" />
              ) : null}
            </div>
            <div className="flex h-20 w-full shrink-0 items-center gap-4">
              <span className="text-7xl font-black">3</span>
              <span className="shrink-0 text-lg font-bold uppercase">
                location
              </span>
              <InputAutosuggest
                paramsAPI={"location"}
                setFormData={(locationData) =>
                  setFormData({
                    ...formData,
                    location: locationData[2],
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-10">
          <h2 className="col-span-3 text-5xl font-black ">Relationships</h2>
          <div className="col-span-7 flex max-w-xl flex-col gap-4">
            <div className="flex w-full shrink-0 gap-4">
              <span className="text-7xl font-black">4</span>
              <span className="mt-5 text-lg font-bold uppercase">Persons</span>
              <div className="mt-[0.85rem] flex w-full flex-col space-y-2">
                <div className="flex shrink-0 items-center gap-4">
                  <InputAutosuggest
                    paramsAPI={"person"}
                    setFormData={handleAddPerson}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.persons.map((person, index) => (
                    <Badge
                      className="max-w-[220px] cursor-pointer hover:bg-destructive hover:text-primary"
                      onClick={() => handleRemovePerson(person.title)}
                      key={index}
                    >
                      <span className="truncate">{person.title}</span>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full shrink-0 gap-4">
              <span className="text-7xl font-black">5</span>
              <span className="mt-5 text-lg font-bold uppercase">Program</span>
              <div className="mt-[0.85rem] flex w-full flex-col space-y-2">
                <div className="flex shrink-0 items-center gap-4">
                  <InputAutosuggest
                    paramsAPI={"work"}
                    setFormData={handleAddWork}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  {formData.works.map((work, index) => (
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-black">{index + 1}.</span>
                      <Badge
                        className="max-w-[320px] cursor-pointer hover:bg-destructive hover:text-primary"
                        onClick={() => handleRemoveWork(work.title)}
                        key={index}
                      >
                        <span className="truncate">{work.title}</span>
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-4">
        <Button variant="subtle" onClick={() => router.back()}>
          Back
        </Button>
        <Button
          isLoading={isLoading}
          disabled={
            formData.title === "" ||
            !formData.date ||
            formData.location.length === 0 ||
            formData.persons.length === 0 ||
            formData.works.length === 0
          }
          onClick={() => {
            createEvent()
          }}
        >
          Create a new Event
        </Button>
      </div>
    </div>
  )
}

export default Page
