"use client"

import Link from "next/link"
import PerformanceSearch from "@/components/research/research"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage() {
  return (
    <section className="flex justify-center mt-10">
      <PerformanceSearch />
    </section>
  )
}
