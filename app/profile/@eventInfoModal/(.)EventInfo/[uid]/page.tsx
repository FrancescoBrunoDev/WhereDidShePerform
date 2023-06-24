import { FC } from "react"

import CloseModal from "@/components/CloseModal"
import EventInfoCardModifier from "@/components/create/EventInfoCardModifier"

const page: FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100">
      <div className="container mx-auto flex h-full max-w-fit items-center">
        <div className="relative h-fit w-full rounded-lg border bg-background px-2 py-20">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>

          <EventInfoCardModifier />
        </div>
      </div>
    </div>
  )
}

export default page