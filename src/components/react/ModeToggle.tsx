import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Toggle } from "@/components/ui/toggle"

// Light is the default for everyone. Only an explicit click is saved, under a new key
// (the old "theme" key was auto-written with "dark" on every visit, so it is ignored).
const KEY = "theme-choice"

function apply(theme: "light" | "dark") {
  document.documentElement.classList.remove("light", "dark")
  document.documentElement.classList.add(theme)
}

export default function ModeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    let saved: string | null = null
    try { saved = localStorage.getItem(KEY) } catch {}
    const initial = saved === "dark" ? "dark" : "light"
    setTheme(initial)
    apply(initial)
  }, [])

  function change(pressed: boolean) {
    const next = pressed ? "dark" : "light"
    setTheme(next)
    apply(next)
    try { localStorage.setItem(KEY, next) } catch {}
  }

  return (
    <Toggle
      aria-label="Toggle theme"
      pressed={theme === "dark"}
      onPressedChange={change}
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
