import { FlipWords } from "@/components/ui/flip-words";

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
  ];

  return (
    <article className="flex justify-center items-center">
      <div className="transition duration-500 ease-in-out text-4xl mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        I'm also a<FlipWords words={words} />
      </div>
    </article>
  );
}
