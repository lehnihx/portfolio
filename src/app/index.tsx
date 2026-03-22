import { commits, langsBytes, loc } from "~/scripts/data.json"

export const App = () => {
  return (
    <div>
      <h2>Amount of commits</h2>
      <p>{commits.length}</p>
      <h2>Amount of lines</h2>
      <p>{loc.length}</p>
      <h2>Languages used the most</h2>
      {langsBytes.map(lang => (
        <div key={lang.name}>
          <p>{lang.name}</p>
          <p>{lang.bytes}</p>
        </div>
      ))}
    </div>
  )
}