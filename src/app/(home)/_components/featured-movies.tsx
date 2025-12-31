import Link from "next/link"
import { Card } from "@/components/ui/card"

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
}

async function fetchFeaturedMovies(): Promise<Movie[]> {
  try {
    // Fetch some popular movies
    const queries = ["inception", "dark knight", "interstellar"]
    const allMovies: Movie[] = []

    for (const q of queries) {
      const response = await fetch(`https://www.omdbapi.com/?s=${q}&type=movie&apikey=${process.env.OMDB_API_KEY}`, {
        next: { revalidate: 86400 },
      })
      const data = await response.json()
      if (data.Search) {
        allMovies.push(...data.Search.slice(0, 3))
      }
    }

    return allMovies.slice(0, 9)
  } catch (error) {
    console.error("Failed to fetch featured movies:", error)
    return []
  }
}

export async function FeaturedMovies() {
  const movies = await fetchFeaturedMovies()

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Popular Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <Link key={movie.imdbID} href={`/movie/${movie.imdbID}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              {movie.Poster && movie.Poster !== "N/A" ? (
                <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="w-full h-64 object-cover" />
              ) : (
                <div className="w-full h-64 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-foreground line-clamp-2">{movie.Title}</h3>
                <p className="text-sm text-muted-foreground">{movie.Year}</p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
