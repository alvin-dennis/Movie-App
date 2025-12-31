export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  if (!id) {
    return Response.json({ error: "Missing id parameter" }, { status: 400 })
  }

  const apiKey =
    (process.env.OMDB_API_KEY || "").split("?")[0].split("&")[0].split("=").pop() || process.env.OMDB_API_KEY

  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error("API request failed:", error)
    return Response.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}
