import React from "react"

export const THEMES = {
  DARK: "dark",
  LIGTH: "light"
}

const ThemeContext = React.createContext({
  theme: THEMES.DARK,
  setTheme: () => { },
})

export default ThemeContext