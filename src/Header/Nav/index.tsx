'use client'

import React, { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

import type { Category } from '@/payload-types'

interface HeaderNavProps {
  categories: Category[]
  activeCategory: string | null
  onCategoryChange: (categorySlug: string | null) => void
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' })
      setTimeout(checkScrollButtons, 300)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' })
      setTimeout(checkScrollButtons, 300)
    }
  }

  React.useEffect(() => {
    const handleResize = () => checkScrollButtons()
    const scrollContainer = scrollContainerRef.current

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', handleResize)
      checkScrollButtons()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkScrollButtons)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [categories])

  return (
    <div className="w-full flex justify-center py-4">
      <div className="relative flex items-center max-w-4xl">
        {/* Left scroll button */}
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollLeft}
            className="absolute left-0 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Scrollable nav container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center space-x-8 overflow-x-auto scrollbar-hide py-2 px-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* "All" 탭 */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => onCategoryChange(null)}
              className={`
                text-sm font-medium transition-colors py-2 px-3 whitespace-nowrap rounded-full
                ${activeCategory === null
                  ? 'text-foreground bg-primary/10 border-b-2 border-primary'
                  : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                }
              `}
            >
              All
            </button>
          </div>

          {/* 카테고리별 탭 */}
          {categories.map((category) => {
            const isActive = activeCategory === category.slug

            return (
              <div key={category.id} className="relative flex-shrink-0">
                <button
                  onClick={() => onCategoryChange(category.slug)}
                  className={`
                    text-sm font-medium transition-colors py-2 px-3 whitespace-nowrap rounded-full
                    ${isActive
                      ? 'text-foreground bg-primary/10 border-b-2 border-primary'
                      : 'text-foreground/70 hover:text-foreground hover:bg-muted/50'
                    }
                  `}
                >
                  {category.title}
                </button>
              </div>
            )
          })}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollRight}
            className="absolute right-0 z-10 h-8 w-8 p-0 bg-background/80 backdrop-blur-sm shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
