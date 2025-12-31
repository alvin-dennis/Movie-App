"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
}

interface MovieGridProps {
  query: string
}

export function MovieGrid({ query }: MovieGridProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()

        if (data.Search) {
          setMovies(data.Search)
        } else {
          setMovies([])
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error)
        setMovies([])
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [query])

  if (loading) {
    return <div className="text-center py-12">Loading movies...</div>
  }

  if (movies.length === 0) {
    return <div className="text-center text-muted-foreground py-12">No movies found</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div className="p-3">
              <h3 className="font-bold text-foreground line-clamp-2">{movie.Title}</h3>
              <p className="text-sm text-muted-foreground">{movie.Year}</p>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
