import { FlipWords } from "@/components/ui/flip-words"

export default function Services() {
  const words = [
    "Rockstar Filmer",
    "Trailer & Journey Producer",
    "Scenarios Video Editor",
    "Tailored Script Programmer",
    "FiveM Servers Consultant",
    "Problem Solver",
    "End-to-end FiveM Server Builder",
    "Full Stack Web Developer",
  ]

  return (
    <div className="transition duration-500 ease-in-out text-[clamp(2rem,4vw,4rem)] mx-auto font-normal text-neutral-600 dark:text-neutral-400">
      Lenix is sure you do not know that he can <FlipWords words={words} />
    </div>
  )
}