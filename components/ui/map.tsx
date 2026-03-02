import { DottedMap } from "@/components/ui/dotted-map"

export function BackgroundDottedMap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <DottedMap
        className="absolute inset-0"
        markers={[{ lat: 36, lng: 3, size: 0.3 }]}
      />
      <div className="to-background absolute inset-0 bg-radial from-transparent to-70%" />
      {children}
    </div>
  )
}
