import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/futurecandy-logo-new.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Artists", href: "/#artists" },
    { name: "Visuals", href: "/#visuals" },
    { name: "Journal", href: "/journal" },
    { name: "Collab", href: "/collab" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-6 py-2">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center transition-all duration-300 hover:scale-105">
            <img 
              src={logo} 
              alt="FutureCandy Logo" 
              className="h-16 md:h-20 w-auto object-contain"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-4 py-2 text-sm font-semibold text-[#1a2942] bg-gradient-to-r from-cyan-400/90 to-blue-400/90 rounded-full transition-all duration-300 hover:from-cyan-300 hover:to-blue-300 hover:shadow-[0_0_20px_rgba(0,170,255,0.6)] hover:scale-105 active:scale-95"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg bg-gradient-to-r from-cyan-400/90 to-blue-400/90 hover:from-cyan-300 hover:to-blue-300 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,170,255,0.6)] active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-6 h-6 text-[#1a2942]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1a2942]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pt-4 pb-2 animate-fade-in space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-sm font-semibold text-[#1a2942] bg-gradient-to-r from-cyan-400/90 to-blue-400/90 rounded-full transition-all duration-300 hover:from-cyan-300 hover:to-blue-300 hover:shadow-[0_0_20px_rgba(0,170,255,0.6)] active:scale-95"
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
