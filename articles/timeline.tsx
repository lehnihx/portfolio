import { Timeline } from "@/lib/ui/timeline";

export default function TimelineJourney() {
  const data = [
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-foreground md:text-sm">
            <span className="text-3xl font-bold">Lenix Studio</span> is a volunteered project focused on FiveM development that helps students, developers, programmers and server owners to achieve their goals.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-foreground md:text-sm">
            <span className="text-3xl font-bold">Trippler Scripts</span> is a professional enterprise dedicated to the FiveM community. It creates clean, efficient, and reliable scripts that make server management easier and more sustainable.
            Its specialization lies in back-end systems, custom frameworks, and practical tools that prioritize efficiency, scalability, and quality. Our coding philosophy is simple: every line of code should be clean, maintainable, and valuable.
            Trippler Scripts is committed to innovation, collaboration, and supporting the FiveM ecosystem. It provides solutions that help server owners run smoother, faster, and with confidence.
          </p>
          <p className="mb-8 text-xs font-normal text-foreground md:text-sm">
            Lorem ipsum is for people who are too lazy to write copy. But we are
            not. Here are some more example of beautiful designs I built.
          </p>
        </div>
      ),
    },
    {
      title: "Later 2023",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-foreground md:text-sm">
            <span className="text-3xl font-bold">Revival States</span> Is a FiveM server that joined the challenge completely different, trying to revive the concept of what Role-Playing is, it has the most modern and latest technology services, and the main goal is the build a harmoned community that create the right and the best content that possibly ever will ever exist in. the arabic region
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="relative overflow-clip mb-16">
      <Timeline data={data} header={{ title: "Timeline", description: "My journey in the world of programming" }} />
    </div>
  );
}
