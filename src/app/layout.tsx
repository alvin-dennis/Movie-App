import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const _geistSans = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieFlix - Discover & Search Movies",
  description: "Search and explore thousands of movies with detailed information and ratings",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${_geistSans.className}`}>
        {children}
      </body>
    </html>
  )
}
