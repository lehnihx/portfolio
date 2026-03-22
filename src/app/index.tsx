import { commits, langsBytes, loc } from "~/scripts/data.json"

const excludedLangs = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript']
// if (excludedLangs.includes(lang)) continue

export const App = () => {
  return (
    <div>
      <h2>Amount of commits</h2>
      <p>{commits.length}</p>
      <h2>Amount of lines wrote</h2>
      <p>{Object.entries(loc).map(entry => (
        <div key={entry[0]}>
          <p>{entry[0]}</p>
          <p>{entry[1]}</p>
        </div>
      ))}</p>
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