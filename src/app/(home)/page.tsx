import { Suspense } from "react"
import { Header } from "@/components/header"
import { FeaturedMovies } from "@/app/(home)/_components/featured-movies"
import { SearchBar } from "@/app/(home)/_components/search-bar"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Discover Movies</h1>
          <SearchBar />
        </div>
        <Suspense fallback={<div className="text-center py-12">Loading featured movies...</div>}>
          <FeaturedMovies />
        </Suspense>
      </main>
    </div>
  )
}
