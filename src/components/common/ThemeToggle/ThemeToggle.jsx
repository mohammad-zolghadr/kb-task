import { Sun, Moon, Monitor } from "lucide-react"

import { useThemeContext } from "../../../contexts/ThemeContext"
import { THEMES } from "../../../utils/constants"

import styles from "./ThemeToggle.module.css"

const ThemeToggle = () => {
  const { theme: activeTheme, changeTheme } = useThemeContext()

  const themes = [
    { key: THEMES.LIGHT, icon: Sun, label: "Light" },
    { key: THEMES.DARK, icon: Moon, label: "Dark" },
    { key: THEMES.SYSTEM, icon: Monitor, label: "System" },
  ]

  return (
    <div className={styles.container}>
      <div className={styles.toggleGroup}>
        {themes.map((theme) => {
          const { key, icon: Icon, label } = theme
          // console.log(activeTheme, key)
          return (
            <button
              key={key}
              onClick={() => changeTheme(key)}
              className={`${styles.toggleButton} ${
                activeTheme === key ? styles.active : ""
              }`}
              title={label}
            >
              <Icon size={16} />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ThemeToggle
