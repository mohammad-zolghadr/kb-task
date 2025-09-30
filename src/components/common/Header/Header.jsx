import { TrendingUp } from "lucide-react"

import ThemeToggle from "../ThemeToggle/ThemeToggle"

import styles from "./Header.module.css"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <TrendingUp
            size={24}
            className={styles.logoIcon}
          />
          <h1 className={styles.title}>Crypto Dashboard</h1>
        </div>

        <div className={styles.actions}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header
