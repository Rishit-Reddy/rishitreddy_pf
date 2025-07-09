import ModeToggle from "@/components/react/ModeToggle"

export default function BlogNavigation() {
  return (
    <nav className="w-full border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="w-[90%] sm:w-[85%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Left side - Name/Logo */}
          <div>
            <a 
              href="/" 
              className="text-xl font-semibold text-foreground hover:text-primary transition-colors duration-200"
            >
              Rishit Reddy
            </a>
          </div>
          
          {/* Right side - Theme toggle */}
          <div>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
