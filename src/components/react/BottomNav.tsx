import ModeToggle from "@/components/react/ModeToggle"
import { Github, Linkedin, Mail } from "lucide-react"

const EMAIL = "rishitpalle@gmail.com"

const links = [
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/masters-journey", match: (p: string) => p.startsWith("/masters-journey") },
  { label: "Projects", href: "/projects", match: (p: string) => p.startsWith("/projects") },
  { label: "Experience", href: "/#experience" },
  { label: "Blog", href: "/blog", match: (p: string) => p.startsWith("/blog") },
  { label: "Contact", href: "/#contact" },
]

export default function BottomNav({ currentPath = "/" }: { currentPath?: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-muted">
      <div className="mx-auto flex max-w-3xl items-center gap-4 overflow-x-auto whitespace-nowrap px-4 py-2 text-sm">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className={
              l.match?.(currentPath)
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            {l.label}
          </a>
        ))}

        <span className="ml-auto flex items-center gap-4">
          <a href="https://github.com/Rishit-Reddy" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-[#181717] dark:text-white hover:opacity-75 transition-opacity">
            <Github className="w-4 h-4" />
          </a>
          <a href="https://www.linkedin.com/in/rishit-reddy-palle/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0A66C2] hover:opacity-75 transition-opacity">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href={`mailto:${EMAIL}`} aria-label="Email" className="text-muted-foreground hover:text-foreground transition-colors">
            <Mail className="w-4 h-4" />
          </a>
          <ModeToggle />
        </span>
      </div>
    </nav>
  )
}
