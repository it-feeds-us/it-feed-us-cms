'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CategoryFilterContextType {
  activeCategory: string | null
  setActiveCategory: (categorySlug: string | null) => void
}

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined)

export const useCategoryFilter = () => {
  const context = useContext(CategoryFilterContext)
  if (context === undefined) {
    throw new Error('useCategoryFilter must be used within a CategoryFilterProvider')
  }
  return context
}

interface CategoryFilterProviderProps {
  children: ReactNode
}

export const CategoryFilterProvider: React.FC<CategoryFilterProviderProps> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <CategoryFilterContext.Provider value={{ activeCategory, setActiveCategory }}>
      {children}
    </CategoryFilterContext.Provider>
  )
}