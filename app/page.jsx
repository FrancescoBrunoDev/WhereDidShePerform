"use client"

import { AnimatePresence, motion as m } from "framer-motion"

import PerformanceSearch from "@/components/research/research"

export default function IndexPage() {
  return (
    <m.section className="container mx-auto lg:px-20 xl:px-44">
        <PerformanceSearch />
    </m.section>
  )
}
