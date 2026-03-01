import "server-only"
export const fetchDiscord = async <T>(path: string, token: string) => {
  try {
    const response = await fetch(`https://discord.com/api/v10/${path}`, {
      headers: {
        Authorization: `Bot ${token}`
      }
    })
    return await response.json() as T
  } catch(error) {
    console.error(error)
  }
}