import { commits, langsBytes, loc } from "~/scripts/data.json"

const excludedLangs = ['MDX', 'Shell', 'Batchfile', 'Makefile', 'HTML', 'CSS', 'JavaScript']

export const App = () => {
  return (
    <div>
      <h2>Amount of commits since last year</h2>
      <p>{commits.length}</p>
      <h2>Amount of written lines of codes</h2>
      <p>{loc.toLocaleString()}</p>
      <h2>Languages used the most</h2>
      {langsBytes.map(lang => !excludedLangs.includes(lang.name) && (
        <div key={lang.name}>
          <p>{lang.name}</p>
          <p>{lang.bytes}</p>
        </div>
      ))}
      <div>
        <p>Others</p>
        {langsBytes.reduce((total, lang) => total + lang.bytes, 0)}
      </div>
    </div>
  )
}