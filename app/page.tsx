"use client"
import MultiStepForm from "@/components/multi-step-form"
import SpaceBackground from "@/components/space-background"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050714] flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <SpaceBackground />
      <MultiStepForm />
    </main>
  )
}
