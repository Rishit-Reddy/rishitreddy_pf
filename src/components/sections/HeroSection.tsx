import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { BoxReveal } from "@/components/magicui/box-reveal";
import { ColoredTypingAnimation } from "@/components/magicui/colored-typing-animation";

export default function Hero() {
  const navItems = [
    // { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
  ];

  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const [desktopNavVisible, setDesktopNavVisible] = useState(false);

  useEffect(() => {
    // Mobile navigation with 1.5s delay (keeping existing timing)
    const mobileTimer = setTimeout(() => setMobileNavVisible(true), 3700);
    // Desktop navigation with 1s delay as requested
    const desktopTimer = setTimeout(() => setDesktopNavVisible(true), 3700);

    return () => {
      clearTimeout(mobileTimer);
      clearTimeout(desktopTimer);
    };
  }, []);

  return (
    <div className="w-full h-full">
      {/* Mobile Layout (Text over Image) */}
      <div className="relative md:hidden mt-4 pt-6">
        <div className="flex justify-center w-full relative">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatedGridPattern
              width={25}
              height={25}
              className={cn(
                "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[250%] skew-y-12"
              )}
              numSquares={60}
              maxOpacity={0.3}
              duration={3}
            />
          </div>
            <img
              src="/profile-image.png"
              alt="Profile"
              className="w-72 h-auto object-cover relative z-10"
            />
        </div>
        <div className="absolute bottom-0 left-0 w-full z-15 p-4 bg-gradient-to-t from-background/90 to-background/20 text-left">
          <BoxReveal boxColor="#4a93dc" duration={0.5}>
            <h2 className="text-3xl font-semibold mb-1">Hi, I'm</h2>
          </BoxReveal>
          <BoxReveal boxColor="#4a93dc" duration={0.5}>
            <h1 className="text-4xl font-bold text-[#4a93dc]">
              Rishit Reddy Palle
            </h1>
          </BoxReveal>
          
          <div className="mt-2">
            <ColoredTypingAnimation 
              className="text-sm text-muted-foreground"
              delay={1000}
              duration={13}
              segments={[
                { text: ""},
                { text: "Full-stack developer", highlight: true, color: "#e0a96d" },
                { text: " currently pursuing a " },
                { text: "Master's in Machine Learning & Image Analysis at Uppsala University", highlight: true, color: "#e0a96d" },
                { text: ", with an interest in building practical web and AI solutions." }
              ]}
            />
          </div>
        </div>
      </div>

      {/* Desktop Layout (Side by Side) */}
      <div className="hidden md:flex md:flex-row items-center w-full h-full text-left">
        {/* Left: Text */}
        <div className="md:flex-1 lg:flex-[1]">
          <BoxReveal boxColor="#4a93dc" duration={0.5}>
            <h2 className="text-3xl md:text-4xl font-semibold mb-2">Hi, I'm</h2>
          </BoxReveal>
          <BoxReveal boxColor="#4a93dc" duration={0.5}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold whitespace-nowrap mb-3 text-[#4a93dc]">
              Rishit Reddy Palle
            </h1>
          </BoxReveal>
          
          <div className="mb-3">
            <ColoredTypingAnimation 
              className="text-base md:text-base lg:text-base text-muted-foreground"
              delay={1000}
              duration={13}
              segments={[
                { text: ""},
                { text: "Full-stack developer", highlight: true, color: "#e0a96d" },
                { text: " currently pursuing a " },
                { text: "Master's in Machine Learning & Image Analysis at Uppsala University", highlight: true, color: "#e0a96d" },
                { text: ", with an interest in building practical web and AI solutions." }
              ]}
            />
          </div>

          {/* Desktop Navigation - Only visible in desktop layout */}
          <div className="hidden md:block">
            <nav className={cn(
              "flex flex-wrap space-x-4 pb-2 transition-opacity duration-500",
              desktopNavVisible ? "opacity-100" : "opacity-0"
            )}>
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3 py-2 rounded-md text-base font-medium hover:bg-accent hover:text-accent-foreground transition-colors mb-2"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Right: Profile Image */}
        <div className="md:flex-1 lg:flex-[0.8] flex justify-center relative">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0">
            <AnimatedGridPattern
              width={30}
              height={30}
              className="relative h-[105%] inset-0 skew-y-6 text-primary/40 -z-10 mask-radial-[350px_250px] mask-radial-to-transparent"
              numSquares={40}
              maxOpacity={0.6}
              duration={1}
              repeatCount={10}
            />
          </div>
          <BoxReveal boxColor="#4a93dc" duration={0.5}>
            <img
              src="/profile-image.png"
              alt="Profile"
              className="w-64 lg:w-72 h-auto object-cover relative z-10"
            />
          </BoxReveal>
        </div>
      </div>

      {/* Mobile Navigation - Horizontally Scrollable */}
      <div
        className={cn(
          "w-full py-4 mt-8 md:hidden transition-opacity duration-500",
          mobileNavVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="relative">
          {/* Gradient indicators for scroll */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable navigation */}
          <div className="overflow-x-auto scrollbar-hide">
            <nav className="flex whitespace-nowrap px-4 py-2 space-x-3 min-w-max">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-4 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors inline-block"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
