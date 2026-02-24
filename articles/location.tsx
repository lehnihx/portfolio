"use client"
import { Globe } from "@/lib/ui/globe";

export const Location = () => <Globe config={{
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 3,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1,
  baseColor: [1, 1, 1],
  markerColor: [0, 0, 0],
  glowColor: [1, 1, 1],
  markers: [{
    location: [36, 3],
    size: 0.15
  }],
}}/>