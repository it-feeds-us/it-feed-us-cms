import type { Metadata } from 'next/types'
import { getCachedCategories } from '@/utilities/getCategories'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import HomePageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [posts, categories] = await Promise.all([
    payload.find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    }),
    getCachedCategories()()
  ])

  return (
    <HomePageClient 
      posts={posts.docs}
      categories={categories}
      totalDocs={posts.totalDocs}
      totalPages={posts.totalPages}
      page={posts.page || 1}
    />
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `IT FEED US`,
    description: 'Latest tech news and articles',
  }
}
