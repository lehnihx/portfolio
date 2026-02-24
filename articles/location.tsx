"use client"
import { useIsInView } from "@/hooks/useIsInView";
import { Globe } from "@/lib/ui/globe";

export const Location = () => {
  const { ref, height, visible } = useIsInView()
  return (
    <div ref={ref} style={{ minHeight: height }}>
      {visible && <Globe config={{
        width: 800,
        height: 800,
        onRender: () => {},
        devicePixelRatio: 2,
        phi: 3,
        theta: 0.3,
        dark: 0,
        diffuse: 0.4,
        mapSamples: 8000,
        mapBrightness: 1,
        baseColor: [1, 1, 1],
        markerColor: [0, 0, 0],
        glowColor: [1, 1, 1],
        markers: [{
          location: [36, 3],
          size: 0.15
        }],
      }}/>}
    </div>
  )
}