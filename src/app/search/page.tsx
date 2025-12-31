import { Suspense } from "react"
import { Header } from "@/components/header"
import { SearchResults } from "@/app/search/search-results"

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="container mx-auto px-4 py-8 text-center">Loading...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  )
}
