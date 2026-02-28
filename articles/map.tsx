import { DottedMap } from "@/stock/dotted-map"

export function DottedMapElement() {
  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-lg border">
      <div className="to-background absolute inset-0 bg-radial from-transparent to-70%" />
      <DottedMap markers={[{ lat: 36, lng: 3, size: 0.3 }]} />
    </div>
  )
}
