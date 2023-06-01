import { useEffect, useState } from "react"
import { motion as m } from "framer-motion"

import { DatePicker } from "@/components/calendar/eventPicker"
import { Icons } from "@/components/icons"

import RandomCard from "./randomCard"
import main from "./statisticGenerator"
import TopPerfomers from "./topPerformers"
import { TopPersons } from "./topPersons"

export default function Suggestions() {
  const handleButtonClick = () => {
    main()
  }

  return (
    <>
      <m.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.1 } }}
        exit={{ y: 5, opacity: 0, transition: { delay: 0.1 } }}
      >
        <m.h1 className="text-end text-4xl font-black md:text-6xl">
          Need some inspiration?
        </m.h1>
        <m.span
          initial={{ x: 0 }}
          animate={{ x: -6 }}
          exit={{ x: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1.5,
          }}
          className="flex justify-end text-sm font-bold"
        >
          scroll for more <Icons.arrowRight className="h-5" />
        </m.span>
      </m.div>

      <m.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: 0.5 } }}
        exit={{ y: 5, opacity: 0, transition: { delay: 0.1 } }}
      >
        <div className="flex snap-x scroll-pl-6 flex-nowrap gap-4 overflow-x-scroll pr-10 pt-1">
          <DatePicker />
          <TopPersons />
          <TopPerfomers />
          <RandomCard />
          {/* <Button onClick={handleButtonClick}>More</Button> */}
        </div>
      </m.div>
    </>
  )
}
