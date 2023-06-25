"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ModifierVerificationEvent from "@/components/ModifierVerificationEventAdmin"
import { Icons } from "@/components/icons"

interface User {
  id: number
  name: string
  role: string
  email: string
  eventVerifications: [{ stateVerification: StateVerification; eventId: number }]
}

const DashboardAdmin = () => {
  const [users, setUsers] = useState<User[]>([])
  const [userIsOpen, setUserIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetch("api/get/getAllUsers")
      const userJson = await user.json()

      setUsers(userJson)
    }

    fetchData()
  }, [])

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black">Dashboard Admin</h1>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex gap-2">
          <Input />
          <Button>search</Button>
        </div>
        <Accordion type="multiple">
          {users.map((user) => {
            const howManyPending = user.eventVerifications.filter(
              (verification) => verification.stateVerification === "PENDING"
            ).length

            return (
              <AccordionItem value={user.id as unknown as string}>
                <AccordionTrigger
                  key={user.id}
                  className="grid h-fit grid-cols-5 items-center px-4 py-2 text-start text-sm"
                  onClick={() => setUserIsOpen(!userIsOpen)}
                >
                  <div>{user.name}</div>
                  <div>{user.role}</div>
                  <div className="flex">
                    <div className="flex w-7 items-center justify-end gap-1">
                      {howManyPending > 0 ? howManyPending : null}
                      <Icons.status
                        className={`${
                          howManyPending > 0
                            ? "fill-orange-500"
                            : "fill-green-600"
                        } h-3 w-3 stroke-none`}
                      />
                    </div>
                  </div>
                  <div className="col-span-2">{user.email}</div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className="flex flex-col gap-2 pt-2">
                    {user.eventVerifications.map((verification, index) => {
                      return (
                        <div className="grid w-full grid-cols-2 items-center">
                          <Link
                            href={`/profile/eventInfo/${verification.eventId}`}
                            className="flex w-fit gap-2 rounded-lg p-1 px-4 hover:bg-secondary"
                          >
                            <div className="font-black">{index + 1}</div>
                            <div>{verification.eventId}</div>
                          </Link>
                          <ModifierVerificationEvent
                            eventId={verification.eventId}
                            verificationStatus={verification.stateVerification}
                          />
                        </div>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

export default DashboardAdmin
