"use client"

import { useState } from "react"
import router from "next/router"
import { useStorePersonCreate } from "@/store/useStorePersonCreate"
import {
  Biography,
  Occupation,
  Person,
  StateVerification,
} from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { isValid } from "date-fns"

import { newPersonPayload } from "@/lib/validators/newPerson"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

import { Icons } from "../icons"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import SearchGeoLocation from "./SearchGeoLocation"
import InputAutosuggest from "./inputAutosuggest"

const PersonInfoCardModifier = ({
  uid,
  type,
}: {
  uid: string | undefined
  type: string | undefined
}) => {
  const { toast } = useToast()

  const [
    dataFormat,
    personTitle,
    occupationFormData,
    setBirth,
    setDeath,
    setFirstName,
    setLastName,
    setOccupationFormData,
  ] = useStorePersonCreate((state) => [
    state.dataFormat,
    state.personTitle,
    state.occupationFormData,
    state.setBirth,
    state.setDeath,
    state.setFirstName,
    state.setLastName,
    state.setOccupationFormData,
  ])

  const [formData, setFormData] = useState<Person>({
    title: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: "",
    uid: "",
    stateVerification: StateVerification.NONE,
    mUid: "",
    link: "",
  })
  const [dataFormData, setDataFormData] = useState<Biography>({
    personUid: "new",
    birth: null,
    death: null,
  })

  const { mutate: managePerson, isLoading } = useMutation({
    mutationFn: async () => {
      let birthDate
      if (dataFormData.birth) {
        birthDate = new Date(dataFormData.birth)
      } else {
        return toast({
          title: "Error",
          description: "Please enter a valid birth date",
        })
      }
      let link
      if (formData.link) {
        link = formData.link
      } else {
        return toast({
          title: "Error",
          description: "Please enter a valid link",
        })
      }
      let occupation
      if (occupationFormData) {
        occupation = occupationFormData
      } else {
        return toast({
          title: "Error",
          description: "Please enter a valid occupation",
        })
      }

      const payload: newPersonPayload = {
        title: formData.title,
        biography: {
          birth: birthDate,
          death: dataFormData.death,
        },
        link: formData.link,
        occupations: occupationFormData.map((occupationData) => ({
          occupation: occupationData.occupation as Occupation,
        })),
      }

      console.log(payload, "payload")

      const { data } = await axios.post("/api/create/createPerson", payload)
      const result = data as string
    },
  })

  return (
    <div className="z-50 mx-4 flex w-full flex-col gap-16">
      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-10">
        <h2 className="col-span-3 pt-2 text-5xl font-black">General Data</h2>
        <div className="col-span-7 flex max-w-xl flex-col gap-16">
          <div className="flex w-full shrink-0 items-start gap-4">
            <div className="flex shrink-0 items-center gap-4">
              <span className="shrink-0 text-7xl font-black">1</span>
              <span className="shrink-0 text-lg font-bold uppercase">Name</span>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-3.5">
              <div className="flex w-full shrink-0 flex-col justify-between lg:flex-row">
                <div className="w-fit shrink-0">
                  {personTitle.first_name.length > 0 && (
                    <Label className="text-2xl font-bold">First Name</Label>
                  )}

                  {/* questi li elimino quando gli imput sono riempiti */}
                  <Input
                    className="-mx-3 h-10 w-full border-none text-3xl font-black"
                    placeholder={type === "new" ? "First Name" : ""}
                    name={"first_name"}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      setFormData({
                        ...formData,
                        title: e.target.value + " " + personTitle.last_name,
                      })
                    }}
                  />
                </div>
                <div className="w-fit shrink-0">
                  {personTitle.last_name.length > 0 && (
                    <Label className="text-2xl font-bold">Last Name</Label>
                  )}
                  <Input
                    className="-mx-3 h-10 w-full border-none text-3xl font-black"
                    placeholder={type === "new" ? "Last Name" : ""}
                    name={"second_name"}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      setFormData({
                        ...formData,
                        title: personTitle.first_name + " " + e.target.value,
                      })
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full shrink-0 items-start gap-4">
            <div className="flex shrink-0 items-center gap-4">
              <span className="shrink-0 text-7xl font-black">2</span>
              <span className="shrink-0 text-lg font-bold uppercase">
                Occupation
              </span>
            </div>

            <div className="flex w-full shrink-0 flex-col justify-between gap-4 xl:flex-row">
              <div className="flex w-fit shrink-0 items-center gap-2">
                <Label className="text-2xl font-bold">Date of Birth</Label>
                <Input
                  defaultValue={type === "new" ? "" : ""}
                  placeholder="yyyy-MM-dd"
                  onChange={(e) => {
                    const inputDate = new Date(e.target.value)
                    const isDateValid = isValid(inputDate)
                    if (!isDateValid) {
                      setDataFormData({ ...dataFormData, birth: null })
                      setBirth(false)
                    }
                    if (isDateValid) {
                      setDataFormData({ ...dataFormData, birth: inputDate })
                      setBirth(true)
                    }
                  }}
                />{" "}
                {dataFormat.birth ? (
                  <Icons.check className="h-4 shrink-0 text-green-600" />
                ) : null}
              </div>
              <div className="flex w-fit shrink-0 items-center gap-2">
                <Label className="text-2xl font-bold">Date of Death</Label>
                <Checkbox
                  onCheckedChange={() => {
                    setDataFormData({ ...dataFormData, death: null })
                    setDeath(!dataFormat.death)
                  }}
                  checked={dataFormat.death}
                ></Checkbox>
                {dataFormat.death ? (
                  <Input
                    defaultValue={type === "new" ? "" : ""}
                    placeholder="yyyy-MM-dd"
                    onChange={(e) => {
                      const inputDate = new Date(e.target.value)
                      const isDateValid = isValid(inputDate)
                      if (!isDateValid) {
                        setDataFormData({ ...dataFormData, death: null })
                      }
                      if (isDateValid) {
                        if (
                          dataFormData.birth &&
                          inputDate > dataFormData.birth
                        ) {
                          setDataFormData({
                            ...dataFormData,
                            death: inputDate,
                          })
                        } else {
                          setDataFormData({ ...dataFormData, death: null })
                        }
                      }
                    }}
                  />
                ) : null}
                {dataFormData.death ? (
                  <Icons.check className="h-4 shrink-0 text-green-600" />
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex w-full shrink-0 items-start gap-4">
            <div className="flex shrink-0 items-center gap-4">
              <span className="shrink-0 text-7xl font-black">2</span>
              <span className="shrink-0 text-lg font-bold uppercase">
                Occupation
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 pt-3.5">
              <div className="flex w-full shrink-0 flex-col justify-between lg:flex-row">
                <div className="grid w-fit shrink-0 grid-cols-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={() => setOccupationFormData("Composer")}
                    />
                    <Label>Composer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={() => setOccupationFormData("Arranger")}
                    />
                    <Label>Arranger</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={() => setOccupationFormData("Performer")}
                    />
                    <Label>Performer</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={() =>
                        setOccupationFormData("Librettist")
                      }
                    />
                    <Label>Librettist</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      onCheckedChange={() => setOccupationFormData("Poet")}
                    />
                    <Label>Poet</Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 lg:grid lg:grid-cols-10">
        <h2 className="col-span-3 pt-2 text-5xl font-black">Sources</h2>
        <div className="col-span-7 flex max-w-xl flex-col gap-4">
          <div className="flex w-full shrink-0 items-start gap-4">
            <div className="flex shrink-0 items-center gap-4">
              <span className="shrink-0 text-7xl font-black">3</span>
              <span className="shrink-0 text-lg font-bold uppercase">
                Links
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="w-fit shrink-0">
                <Label className="text-2xl font-bold">link to a source</Label>
                <p className="text-sm">
                  link to a website or a trustable source
                </p>
                <Input
                  placeholder={type === "new" ? "www.example.it" : ""}
                  name={"first_name"}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      link: e.target.value,
                    })
                  }}
                />
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
          disabled={formData.title === "" || dataFormData.birth === null}
          onClick={() => {
            managePerson()
          }}
        >
          {type === "new" ? "Create a new person" : "Update person"}
        </Button>
      </div>
    </div>
  )
}

export default PersonInfoCardModifier
