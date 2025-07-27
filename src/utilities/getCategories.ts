import type { Category } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function getCategories(): Promise<Category[]> {
  const payload = await getPayload({ config: configPromise })

  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 20, // 필요에 따라 조정
    sort: 'title', // 제목순으로 정렬
  })

  return categories.docs
}

/**
 * Returns a unstable_cache function mapped with the cache tag for categories
 */
export const getCachedCategories = () =>
  unstable_cache(async () => getCategories(), ['categories'], {
    tags: ['categories'],
  })