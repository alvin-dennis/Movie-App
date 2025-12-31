export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get("q")

  if (!q) {
    return Response.json({ error: "Missing query parameter" }, { status: 400 })
  }

  const apiKey =
    (process.env.OMDB_API_KEY || "").split("?")[0].split("&")[0].split("=").pop() || process.env.OMDB_API_KEY

  if (!apiKey) {
    return Response.json({ error: "API key not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(q)}&type=movie&apikey=${apiKey}`)
    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error("API request failed:", error)
    return Response.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}
