'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { useCategoryFilter } from '@/providers/CategoryFilter'
import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import React, { useEffect, useMemo } from 'react'

import type { Post } from '@/payload-types'

interface PageClientProps {
  posts: Post[]
  totalDocs: number
  totalPages: number
  page: number
}

const PageClient: React.FC<PageClientProps> = ({ posts, totalDocs, totalPages, page }) => {
  /* Force the header to be dark mode while we have an image behind it */
  const { setHeaderTheme } = useHeaderTheme()
  const { activeCategory } = useCategoryFilter()

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
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
          {activeCategory && (
            <p className="text-muted-foreground">
              Showing posts in category: {activeCategory}
            </p>
          )}
        </div>
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

export default PageClient
