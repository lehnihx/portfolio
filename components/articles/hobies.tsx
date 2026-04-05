import { HOBIES } from "@/lib/constants";
import RotatingText from "../ui/swap";

export const Hobies = () => (
  <div className='text-foreground/30'>
    <span>Self-taught computer scientist who loves </span>
    <RotatingText
      texts={HOBIES}
      mainClassName='inline-flex flex-wrap whitespace-normal align-baseline'
    />
  </div>
)