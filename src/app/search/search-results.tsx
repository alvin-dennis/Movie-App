"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
}

export function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      setLoading(true)
      setError("")
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()

        if (data.Search) {
          setMovies(data.Search)
        } else {
          setError("No movies found for your search")
          setMovies([])
        }
      } catch (err) {
        setError("Failed to fetch movies")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Search Results</h1>
      <p className="text-muted-foreground mb-6">{query ? `Results for "${query}"` : "Enter a search term"}</p>

      {loading && <div className="text-center py-12">Loading...</div>}

      {error && <div className="text-center text-destructive py-12">{error}</div>}

      {movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <Link key={movie.imdbID} href={`/movie/${movie.imdbID}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                {movie.Poster && movie.Poster !== "N/A" ? (
                  <img
                    src={movie.Poster || "/placeholder.svg"}
                    alt={movie.Title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">No Image</span>
                  </div>
                )}
                <div className="p-3">
                  <h3 className="font-bold text-foreground line-clamp-2">{movie.Title}</h3>
                  <p className="text-sm text-muted-foreground">{movie.Year}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
