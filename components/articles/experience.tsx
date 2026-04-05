import { EXPERIENCE } from "@/lib/constants";
import RotatingText from "../ui/swap";

export const Experience = () => (
  <div className='text-foreground/30'>
    <span>I used to do </span>
    <RotatingText
      texts={EXPERIENCE}
      mainClassName='inline-flex flex-wrap whitespace-normal align-baseline'
    />
  </div>
)