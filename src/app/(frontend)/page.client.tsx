'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useCategoryFilter } from '@/providers/CategoryFilter'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { HeaderNav } from '@/Header/Nav'
import React, { useEffect, useMemo } from 'react'

import type { Post, Category } from '@/payload-types'

interface HomePageClientProps {
  posts: Post[]
  categories: Category[]
  totalDocs: number
  totalPages: number
  page: number
}

const HomePageClient: React.FC<HomePageClientProps> = ({ 
  posts, 
  categories, 
  totalDocs, 
  totalPages, 
  page 
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const { activeCategory, setActiveCategory } = useCategoryFilter()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  // 카테고리로 필터링된 게시글
  const filteredPosts = useMemo(() => {
    if (!activeCategory) {
      return posts
    }

    return posts.filter(post => {
      if (!post.categories || !Array.isArray(post.categories)) {
        return false
      }
      
      return post.categories.some(category => {
        if (typeof category === 'object' && category !== null && 'slug' in category) {
          return category.slug === activeCategory
        }
        return false
      })
    })
  }, [posts, activeCategory])

  const filteredCount = filteredPosts.length

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <h1>Welcome to IT FEED US</h1>
          <p className="text-muted-foreground">
            Stay updated with the latest in technology, programming, and more
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border mb-8">
        <HeaderNav 
          categories={categories} 
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={1}
          limit={filteredCount}
          totalDocs={filteredCount}
        />
      </div>

      <CollectionArchive posts={filteredPosts} />

      {/* 필터링된 결과에는 페이지네이션을 표시하지 않음 */}
      {!activeCategory && (
        <div className="container">
          {totalPages > 1 && page && (
            <Pagination page={page} totalPages={totalPages} />
          )}
        </div>
      )}
    </div>
  )
}

export default HomePageClient