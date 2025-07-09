import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle" 

export default function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null
    const preferred = saved ?? "dark"
    setTheme(preferred)
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(preferred)
  }, [])

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
    localStorage.setItem("theme", theme)
  }, [theme])

  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={theme === "dark"}
      onPressedChange={(pressed) => setTheme(pressed ? "dark" : "light")}
      className="rounded-full px-3 py-2 cursor-pointer"
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4 text-yellow-400" />
      ) : (
        <Sun className="h-4 w-4 text-orange-500" />
      )}
    </Toggle>
  )
}
