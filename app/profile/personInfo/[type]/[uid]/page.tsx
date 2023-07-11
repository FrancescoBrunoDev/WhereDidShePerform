"use client"

import { Suspense } from "react"

import PersonInfoCardModifier from "@/components/create/PersonInfoCardModifier"

/* import PersonInfoCardVisualiser from "@/components/create/PersonInfoCardVisualiser" */

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
      {type === "modify" && <PersonInfoCardModifier uid={uid} type={type} />}
      {type === "new" && <PersonInfoCardModifier uid={uid} type={type} />}
      {/*{type === "visualise" && <PersonInfoCardVisualiser uid={uid} />} */}
    </Suspense>
  )
}

export default Page
