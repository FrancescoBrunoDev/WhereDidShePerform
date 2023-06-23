"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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

interface Location {
  title: string
  mUid: string
}

const Page = ({}) => {
  const params = useParams()
  const router = useRouter()
  const [dataFormat, setDataFormat] = useState<boolean>()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: null as Date | null,
    locationsM: [] as Location[],
    personsM: [] as Person[],
    worksM: [] as Work[],
    uid: params.uid,
  })

  useEffect(() => {
    if (params.uid !== "newEvent") {
      const fetchData = async () => {
        try {
          const payload = {
            uid: params.uid,
          }

          const { data } = await axios.post(`/api/create/getEvent/`, payload)
          const dateConverted = new Date(data.date)
          setFormData({
            title: data.title,
            category: data.category,
            date: dateConverted,
            locationsM: data.locationsM,
            personsM: data.personsM,
            worksM: data.worksM,
            uid: params.uid,
          })
        } catch (error) {
          // Handle error
        }
      }
      fetchData()
      setDataFormat(true)
    }
  }, [params.uid])

  const { mutate: manageEvent, isLoading } = useMutation({
    mutationFn: async () => {
      const dateValue: string = formData.date ? formData.date.toISOString() : "" // Use an empty string as the default value

      const payload: NewEventPayload = {
        title: formData.title,
        category: formData.category,
        date: dateValue,
        locationsM: formData.locationsM,
        personsM: formData.personsM,
        worksM: formData.worksM,
        uid: formData.uid,
      }

      const url =
        params.uid === "newEvent"
          ? "/api/create/createEvent"
          : "/api/create/updateEvent"

      console.log(url, "url")

      const { data } = await axios.post(url, payload)

      router.push(`/profile`)
      return data as string
    },
  })

  const handleAddPerson = (value: [string, string, string]) => {
    const newMUid = value[2]
    const mUidExists = formData.personsM.some(
      (person) => person.mUid === newMUid
    )
    if (!mUidExists) {
      const newPerson = { title: value[0], mUid: newMUid }
      const newPersons = [...formData.personsM, newPerson]
      setFormData({
        ...formData,
        personsM: newPersons,
      })
    }
  }

  const handleRemovePerson = (title: string) => {
    const newPersons = formData.personsM.filter(
      (person) => person.title !== title
    )
    setFormData({
      ...formData,
      personsM: newPersons,
    })
  }

  const handleAddWork = (value: [string, string, string]) => {
    const newMUid = value[2]
    const mUidExists = formData.worksM.some((work) => work.mUid === newMUid)
    if (!mUidExists) {
      const newWork = { title: value[0], mUid: newMUid }
      const newWorks = [...formData.worksM, newWork]
      setFormData({
        ...formData,
        worksM: newWorks,
      })
    }
  }

  const handleRemoveWork = (title: string) => {
    const newWorks = formData.worksM.filter((work) => work.title !== title)
    setFormData({
      ...formData,
      worksM: newWorks,
    })
  }

  let formattedDate = ""

  if (params.uid !== "newEvent" && formData.date) {
    const dateObj = new Date(formData.date)

    if (!isNaN(dateObj.getTime())) {
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, "0")
      const day = String(dateObj.getDate()).padStart(2, "0")
      formattedDate = `${year}-${month}-${day}`
    }
  }

  return (
    <div className="py h-fit">
      <div className="mx-4 flex w-full flex-col gap-16">
        <Input
          className="-mx-4 h-20 w-full border-none text-7xl font-black"
          placeholder={params.uid === "newEvent" ? "Event Name" : ""}
          defaultValue={params.uid !== "newEvent" ? formData.title : ""}
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
                value={formData.category}
                onValueChange={(e) => setFormData({ ...formData, category: e })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="category" />
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
                defaultValue={params.uid === "newEvent" ? "" : formattedDate}
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
              {!formData.locationsM[0]?.title ? (
                <InputAutosuggest
                  paramsAPI={"location"}
                  setFormData={(locationData) =>
                    setFormData({
                      ...formData,
                      locationsM: [
                        {
                          title: locationData[0],
                          mUid: locationData[2],
                        },
                      ],
                    })
                  }
                />
              ) : (
                <Badge
                  className="max-w-[220px] cursor-pointer hover:bg-destructive hover:text-primary"
                  onClick={() => {
                    setFormData({
                      ...formData,
                      locationsM: [],
                    })
                  }}
                >
                  {formData.locationsM[0]?.title}
                </Badge>
              )}
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
                  {formData.personsM.map((person, index) => (
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
                  {formData.worksM.map((work, index) => (
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
            !dataFormat ||
            formData.locationsM.length === 0 ||
            formData.personsM.length === 0 ||
            formData.worksM.length === 0
          }
          onClick={() => {
            manageEvent()
          }}
        >
          {params.uid === "newEvent" ? "Create a new Event" : "Update Event"}
        </Button>
      </div>
    </div>
  )
}

export default Page
