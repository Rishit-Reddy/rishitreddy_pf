import { useEffect, useState } from "react"
import { Dock, DockIcon } from "@/components/magicui/dock"
import { HomeIcon, Clipboard, Check, BookOpen } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import ModeToggle from "@/components/react/ModeToggle"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const EMAIL = "rishitpalle@gmail.com"

const getData = (theme: "light" | "dark" | null) => ({
  navbar: [
    { href: "#herosection", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: BookOpen, label: "Blog" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/Rishit-Reddy",
      icon: () => (
        <img
          src={"/github-dark.png"}
          alt="GitHub"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/rishit-reddy-palle/",
      icon: () => (
        <img
          src="/linkedin.png"
          alt="LinkedIn"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      ),
    },
    {
      name: "Gmail",
      href: `https://mail.google.com/mail/?view=cm&to=${EMAIL}`,
      icon: () => (
        <img
          src="/gmail.png"
          alt="Gmail"
          className="w-6 h-6 sm:w-7 sm:h-7"
        />
      ),
    },
  ],
})

export default function HeaderDock() {
  const [stuck, setStuck] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | null>("light")
  const [data, setData] = useState(getData("light"))

  useEffect(() => {
    const handleScroll = () => setStuck(window.scrollY > 100)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    setTheme(savedTheme ?? "light")
  }, [])

  useEffect(() => {
    setData(getData(theme))
  }, [theme, setTheme])

  // Function to handle clipboard operations with fallbacks for mobile
  const copyToClipboard = async (text: string) => {
    try {
      // Try using the modern Clipboard API
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text)
        toast.success("Email copied to clipboard")
        return
      }

      // Fallback method using a temporary textarea element
      const textArea = document.createElement("textarea")
      textArea.value = text

      // Make the textarea out of viewport
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)

      // Focus and select the text
      textArea.focus()
      textArea.select()

      // Execute the copy command
      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)

      if (successful) {
        toast.success("Email copied to clipboard")
      } else {
        toast.error("Failed to copy email. Please try manually selecting it.")
        // Show email in a toast that can be manually selected
        toast(
          <div className="select-all text-center">{EMAIL}</div>,
          { duration: 5000, position: "top-center" }
        )
      }
    } catch (err) {
      console.error("Copy failed:", err)
      toast.error("Failed to copy email. Please try manually selecting it.")
      // Show email in a toast that can be manually selected
      toast(
        <div className="select-all text-center">{EMAIL}</div>,
        { duration: 5000, position: "top-center" }
      )
    }
  }

  // CopyButton component that changes to checkmark when clicked
  function CopyButton({ onCopy }: { onCopy: () => void }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
      onCopy()
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <button
        onClick={handleCopy}
        className="ml-1 p-1 rounded-md hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Copy email to clipboard"
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Clipboard className="h-4 w-4" />
        )}
      </button>
    )
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-0 right-0 z-50 transition-all duration-500 flex justify-center",
        stuck && "top-0 sticky"
      )}
    >
      <TooltipProvider>
        <Dock iconSize={60} className="px-4 sm:px-6 py-2 rounded-2xl max-w-[98vw] mx-auto">
          {data.navbar.map((item) => (
            <DockIcon key={item.label} className="mx-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={item.href}
                    aria-label={item.label}
                    className="w-11 h-11 rounded-full flex items-center justify-center"
                  >
                    <item.icon className="w-5 h-5" />
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{item.label}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-full" />

          {data.social.map((social) => (
            <DockIcon key={social.name} className="mx-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  {social.name === "Gmail" ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          aria-label={social.name}
                          className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          {social.icon()}
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="top" className="p-1 px-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm select-all border p-1 px-4 rounded-xl">{EMAIL}</span>
                          <CopyButton onCopy={() => copyToClipboard(EMAIL)} />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="w-11 h-11 rounded-full flex items-center justify-center"
                    >
                      {social.icon()}
                    </a>
                  )}
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{social.name}</p>
                </TooltipContent>
              </Tooltip>
            </DockIcon>
          ))}

          <Separator orientation="vertical" className="h-full py-2" />

          <DockIcon className="mx-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="rounded-full">
                  <ModeToggle />
                </div>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Theme</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </div>
  )
}
