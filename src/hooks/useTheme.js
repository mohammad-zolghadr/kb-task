import { useState, useEffect } from "react"
import { THEMES, LOCAL_STORAGE_KEYS } from "../utils/constants"

export const useTheme = () => {
  const [theme, setTheme] = useState(THEMES.SYSTEM)
  const [resolvedTheme, setResolvedTheme] = useState(THEMES.LIGHT)

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const updateResolvedTheme = () => {
      let newResolvedTheme = theme

      if (theme === THEMES.SYSTEM) {
        newResolvedTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? THEMES.DARK
          : THEMES.LIGHT
      }

      setResolvedTheme(newResolvedTheme)
      document.documentElement.setAttribute("data-theme", newResolvedTheme)
    }

    updateResolvedTheme()

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      if (theme === THEMES.SYSTEM) {
        updateResolvedTheme()
      }
    }

    mediaQuery.addListener(handleChange)
    return () => mediaQuery.removeListener(handleChange)
  }, [theme])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme)
  }

  return {
    theme,
    resolvedTheme,
    changeTheme,
    isDark: resolvedTheme === THEMES.DARK,
  }
}
