import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { CategoryFilterProvider } from './CategoryFilter'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <CategoryFilterProvider>
          {children}
        </CategoryFilterProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
