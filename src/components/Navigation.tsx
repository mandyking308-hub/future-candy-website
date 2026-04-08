import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/futurecandy-logo-new.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Artists", href: "/artists" },
    { name: "Music", href: "/music" },
    { name: "Visuals", href: "/#visuals" },
    { name: "Journal", href: "/journal" },
    { name: "Collab", href: "/collab" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-border/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)]">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center transition-all duration-400 hover:scale-[1.03]">
            <img 
              src={logo} 
              alt="FutureCandy Logo" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-1.5 text-sm font-medium text-[#2a3a52] rounded-full transition-all duration-300 hover:bg-[#2a3a52]/5 hover:text-[#1a2942]"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full text-[#2a3a52] hover:bg-[#2a3a52]/5 transition-all duration-300 active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-3 pb-2 animate-fade-in space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-sm font-medium text-[#2a3a52] rounded-full transition-all duration-300 hover:bg-[#2a3a52]/5"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
