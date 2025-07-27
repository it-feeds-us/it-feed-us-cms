'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { Button } from '@/components/ui/button'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Logo loading="eager" priority="high" className="invert dark:invert-0" />
            </Link>
          </div>
          {/* Center Title */}
          <div className="flex-1 flex justify-center">
            <Link href="/"
              className="text-xl font-bold text-foreground hover:text-foreground/80 transition-colors">
              IT FEED US
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Link href="/search">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <SearchIcon className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </Link>

            {/* Subscribe button */}
            <Button variant="default" size="sm" className="hidden sm:inline-flex">
              Subscribe
            </Button>

            {/* Sign in button */}
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </div>
        </div>
      </div>
      
    </header>
  )
}
