import data from "@/data.json"

export const App = () => {
  return (
    <div>
      <h1>Amout of commits</h1>
      <p>{data.commits.length}</p>
    </div>
  )
}