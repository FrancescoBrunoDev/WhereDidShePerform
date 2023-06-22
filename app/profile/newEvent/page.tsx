"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Page = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    location: "",
    persons: "",
    program: "",
  })

  const {} = useMutation({
    mutationFn: async () => {
      const payload = {
        title: formData.title,
        category: formData.category,
        date: formData.date,
        location: formData.location,
        persons: formData.persons,
        program: formData.program,
      }

      const { data } = await axios.post("/api/createEvent", payload)
    },
  })

  console.log(formData, "input")
  return (
    <div>
      <form id="formEvent" className="mx-4 flex w-full flex-col gap-16">
        <Input
          className="-mx-4 h-20 w-full border-none text-7xl font-black"
          placeholder="Event Name"
          name={"title"}
          /*   value={formData.title} */
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <div className="grid grid-cols-10 gap-8">
          <h2 className="col-span-3 pt-2 text-5xl font-black">General Data</h2>
          <div className="col-span-7 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-7xl font-black">1</span>
              <span className="text-lg font-bold uppercase">
                select a category
              </span>
              <Select
                defaultValue="Concert"
                onValueChange={(e) => setFormData({ ...formData, category: e })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
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
            <div className="flex items-center gap-4">
              <span className="text-7xl font-black">2</span>
              <span className="text-lg font-bold uppercase">
                Date of the Event
              </span>
              <Input
                placeholder="yyyy-MM-dd"
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-7xl font-black">3</span>
              <span className="text-lg font-bold uppercase">location</span>
              <Input
                placeholder="location"
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-8">
          <h2 className="col-span-3 text-5xl font-black ">Relationships</h2>
          <div className="col-span-7 flex flex-col gap-4">
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-7xl font-black">4</span>
              <span className="text-lg font-bold uppercase">Persons</span>
              <Input
                placeholder="person"
                onChange={(e) =>
                  setFormData({ ...formData, persons: e.target.value })
                }
              />
            </div>
            <div className="flex shrink-0 items-center gap-4">
              <span className="text-7xl font-black">5</span>
              <span className="text-lg font-bold uppercase">Program</span>
              <Input
                placeholder="programm"
                onChange={(e) =>
                  setFormData({ ...formData, program: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </form>
      <div className="mt-10 flex justify-center gap-4">
        <Button variant="subtle" onClick={() => router.back()}>
          Back
        </Button>
        <Button>Create a new Event</Button>
      </div>
    </div>
  )
}

export default Page
