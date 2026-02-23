import { useDict } from "@/lib/dict"

export const Copyrights = () => {
  const Dict = useDict()
  return (
    <p className="text-center text-gray-500 text-xs">© {new Date().getFullYear()} {Dict.lenix}. {Dict.rights}.</p>
  )
}