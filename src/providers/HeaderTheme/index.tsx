'use client'

import React, { createContext, useCallback, useContext, useState } from 'react'

export type Theme = 'dark' | 'light'

type HeaderThemeContextType = {
  headerTheme: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const HeaderThemeContext = createContext<HeaderThemeContextType>({
  headerTheme: null,
  setHeaderTheme: () => {},
})

export const HeaderThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [headerTheme, setHeaderThemeState] = useState<Theme | null>(null)

  const setHeaderTheme = useCallback((theme: Theme | null) => {
    setHeaderThemeState(theme)
  }, [])

  return (
    <HeaderThemeContext.Provider value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext.Provider>
  )
}

export const useHeaderTheme = (): HeaderThemeContextType => {
  const context = useContext(HeaderThemeContext)
  if (context === undefined) {
    throw new Error('useHeaderTheme must be used within a HeaderThemeProvider')
  }
  return context
}
