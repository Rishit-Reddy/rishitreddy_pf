import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navItems = [
	{ label: "About", href: "#about" },
	{ label: "Projects", href: "#projects" },
	{ label: "Experience", href: "#experience" },
	{ label: "Skills", href: "#skills" },
	{ label: "Blog", href: "/blog" },
	{ label: "Contact", href: "#contact" }
];

export default function MainNavigation() {
	const [isVisible, setIsVisible] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	// Close mobile menu when navigation item is clicked
	const handleNavItemClick = () => {
		setIsMobileMenuOpen(false);
	};

	useEffect(() => {
		const handleScroll = () => {
			// Show nav after scrolling past the hero section (approximately)
			const scrollY = window.scrollY;
			setIsVisible(scrollY > window.innerHeight * 0.7);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div
			className={cn(
				"fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 transform",
				isVisible
					? "translate-y-0 opacity-100 shadow-md"
					: "-translate-y-full opacity-0"
			)}
		>
			<div className="bg-background/95 backdrop-blur border-b border-border">
				<div className="w-[90%] sm:w-[85%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto">
					<div className="flex h-16 items-center justify-between">
						{/* Logo/Brand */}
						<div className="flex-shrink-0 font-semibold">
							<a
								href="#herosection"
								className="text-foreground hover:text-primary transition-colors"
							>
								Rishit Reddy
							</a>
						</div>

						{/* Desktop Navigation Links */}
						<nav className="hidden md:flex items-center space-x-4">
							{navItems.map((item) => (
								<a
									key={item.label}
									href={item.href}
									className="px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
								>
									{item.label}
								</a>
							))}
						</nav>

						{/* Mobile Hamburger Menu Button */}
						<button
							className="md:hidden p-2 rounded-md hover:bg-accent focus:outline-none"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label={
								isMobileMenuOpen ? "Close menu" : "Open menu"
							}
						>
							{isMobileMenuOpen ? (
								<X className="h-6 w-6" />
							) : (
								<Menu className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Menu Dropdown */}
				<div
					className={cn(
						"md:hidden transition-all duration-300 overflow-hidden",
						isMobileMenuOpen
							? "max-h-96 opacity-100"
							: "max-h-0 opacity-0"
					)}
				>
					<div className="px-4 py-2 space-y-1 bg-background/95 backdrop-blur">
						{navItems.map((item) => (
							<a
								key={item.label}
								href={item.href}
								className="block px-3 py-2 rounded-md text-base font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
								onClick={handleNavItemClick}
							>
								{item.label}
							</a>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
