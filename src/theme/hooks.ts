import { useThemeStore } from "@/store/theme"
import { useTheme as useThemeNext } from "next-themes"
const useTheme = () => {
  const {theme:themeStore, setTheme:setThemeStore} = useThemeStore()
  const {setTheme} = useThemeNext()
  const toggleTheme = () => {
    setThemeStore(themeStore === "light" ? "dark" : "light")
    setTheme(themeStore === "light" ? "dark" : "light")
  }
  return {
    theme: themeStore,
    toggleTheme
  }
}
export default useTheme