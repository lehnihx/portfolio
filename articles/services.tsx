"use client"
import { FlipWords } from "@/components/ui/flip-words"
import { useDict } from "@/hooks/useDict"

export default function Services() {
  const { services } = useDict()
  return (
    <div style={{ fontSize: 'var(--font-size-fluid-xl)' }} className="transition duration-500 ease-in-out mx-auto font-normal text-neutral-600 dark:text-neutral-400">
      Lenix is sure that you do not know that he is also a<FlipWords words={services} />
    </div>
  )
}
