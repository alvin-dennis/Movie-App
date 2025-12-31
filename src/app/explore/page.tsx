"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { MovieGrid } from "@/app/explore/_components/movie-grid"
import { Button } from "@/components/ui/button"

const GENRES = ["Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Horror"]
const LISTS = [
  { id: "popular", name: "Popular Movies", query: "popular" },
  { id: "top-rated", name: "Top Rated", query: "top" },
  { id: "latest", name: "Latest Releases", query: "new" },
]

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<"genres" | "lists">("genres")
  const [selectedGenre, setSelectedGenre] = useState("Action")
  const [selectedList, setSelectedList] = useState("popular")

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Explore</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <Button onClick={() => setActiveTab("genres")} variant={activeTab === "genres" ? "default" : "outline"}>
            By Genre
          </Button>
          <Button onClick={() => setActiveTab("lists")} variant={activeTab === "lists" ? "default" : "outline"}>
            By List
          </Button>
        </div>

        {/* Genres */}
        {activeTab === "genres" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {GENRES.map((genre) => (
                <Button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  variant={selectedGenre === genre ? "default" : "outline"}
                >
                  {genre}
                </Button>
              ))}
            </div>
            <MovieGrid query={selectedGenre} />
          </div>
        )}

        {/* Lists */}
        {activeTab === "lists" && (
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {LISTS.map((list) => (
                <Button
                  key={list.id}
                  onClick={() => setSelectedList(list.id)}
                  variant={selectedList === list.id ? "default" : "outline"}
                >
                  {list.name}
                </Button>
              ))}
            </div>
            <MovieGrid query={LISTS.find((l) => l.id === selectedList)?.query || "movie"} />
          </div>
        )}
      </main>
    </div>
  )
}
