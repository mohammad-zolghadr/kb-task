"use client"

import { useEffect } from "react"
import { ThemeProvider } from "../contexts/ThemeContext"

import Header from "../components/common/Header/Header"
import Dashboard from "../components/Dashboard/Dashboard"

import styles from "./page.module.css"
import "../styles/globals.css"
import "../styles/themes.css"

function App() {
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("crypto-dashboard-theme") || "system"
    let resolvedTheme = savedTheme

    if (savedTheme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    }

    document.documentElement.setAttribute("data-theme", resolvedTheme)
  }, [])

  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Dashboard />
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
