import Link from "next/link"

const Unauthorized = () => {
  return (
    <main>
      <h1>401 - Unauthorized</h1>
      <p>Please log in to access this page.</p>
      <Link href="/" />
    </main>
  )
}
export default Unauthorized