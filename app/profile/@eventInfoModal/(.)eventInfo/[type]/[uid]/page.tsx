"use client"

import { Suspense } from "react"

import EventInfoCardModifier from "@/components/create/EventInfoCardModifier"
import EventInfoCardVisualiser from "@/components/create/EventInfoCardVisualiser"

type PageParams = {
  type: string | undefined
  uid: string | undefined
}

const Page = async ({ params }: { params: PageParams }) => {
  const { type, uid } = params

  if (!type || !uid) {
    // Handle the case when type or uid is undefined
    // For example, return an error or a default value
    return null
  }

  return (
    <Suspense>
      {type === "modify" && <EventInfoCardModifier uid={uid} type={type} />}
      {type === "new" && <EventInfoCardModifier uid={uid} type={type} />}
      {type === "visualise" && <EventInfoCardVisualiser uid={uid} />}
    </Suspense>
  )
}

export default Page
