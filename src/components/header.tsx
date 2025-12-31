import Link from "next/link"

export function Header() {
  return (
    <header className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold">M</span>
          </div>
          <span className="text-xl font-bold text-foreground">MovieFlix</span>
        </Link>
        <nav className="flex gap-6">
          <Link href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/explore" className="text-foreground hover:text-primary transition-colors">
            Explore
          </Link>
        </nav>
      </div>
    </header>
  )
}
