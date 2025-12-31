"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search movies, actors, genres..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-card text-foreground placeholder:text-muted-foreground"
      />
      <Button type="submit" className="bg-primary hover:bg-primary/90">
        Search
      </Button>
    </form>
  )
}
