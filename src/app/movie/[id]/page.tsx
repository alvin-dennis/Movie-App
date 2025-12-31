import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface MovieDetails {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
  imdbVotes: string
  Type: string
}

async function fetchMovie(id: string): Promise<MovieDetails | null> {
  try {
    const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${process.env.OMDB_API_KEY}`, {
      next: { revalidate: 86400 },
    })
    const data = await response.json()

    if (data.Response === "True") {
      return data
    }
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

export default async function MovieDetailPage({ params }: { params: { id: string } }) {
  const movie = await fetchMovie(params.id)

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center text-destructive mb-6">Movie not found</div>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link href="/" className="mb-6 inline-block">
          <Button variant="outline">← Back</Button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster */}
          <div>
            {movie.Poster && movie.Poster !== "N/A" ? (
              <img src={movie.Poster || "/placeholder.svg"} alt={movie.Title} className="w-full rounded-lg shadow-lg" />
            ) : (
              <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground">No Image Available</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-foreground mb-2">{movie.Title}</h1>
            <div className="flex gap-4 mb-6">
              <span className="text-lg text-muted-foreground">{movie.Year}</span>
              {movie.imdbRating !== "N/A" && (
                <span className="text-lg font-semibold text-primary">★ {movie.imdbRating}/10</span>
              )}
              {movie.Rated !== "N/A" && <span className="text-lg text-muted-foreground">{movie.Rated}</span>}
            </div>

            {/* Info Grid */}
            <div className="space-y-6">
              {movie.Genre && movie.Genre !== "N/A" && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">GENRE</h3>
                  <p className="text-foreground">{movie.Genre}</p>
                </div>
              )}

              {movie.Runtime && movie.Runtime !== "N/A" && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">RUNTIME</h3>
                  <p className="text-foreground">{movie.Runtime}</p>
                </div>
              )}

              {movie.Director && movie.Director !== "N/A" && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">DIRECTOR</h3>
                  <p className="text-foreground">{movie.Director}</p>
                </div>
              )}

              {movie.Actors && movie.Actors !== "N/A" && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">CAST</h3>
                  <p className="text-foreground">{movie.Actors}</p>
                </div>
              )}

              {movie.Plot && movie.Plot !== "N/A" && (
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground mb-1">PLOT</h3>
                  <p className="text-foreground">{movie.Plot}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
