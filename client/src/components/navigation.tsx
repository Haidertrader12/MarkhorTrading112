import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50" style={{ position: 'fixed' }}>
      <div className="container mx-auto px-6 py-4 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 gold-gradient rounded-xl flex items-center justify-center animate-pulse-glow shadow-lg">
                <Mountain className="text-navy font-bold" size={24} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent brand-3d premium-text-glow tracking-wide">
                MARKHOR
              </span>
              <span className="text-sm font-bold text-accent tracking-[0.2em] -mt-1 premium-text-glow">
                TRADER
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <a 
              href="/" 
              className="nav-link"
            >
              Home
            </a>
            <a 
              href="#about" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              About Us
            </a>
            <a href="/courses" className="nav-link">
              Courses
            </a>
            <a href="/trading-bots" className="nav-link">
              Trading Bots
            </a>
            <a 
              href="#news" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              News
            </a>
            <a 
              href="#contact" 
              className="nav-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Contact Us
            </a>
        </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Login
            </Button>
            <Button className="gold-gradient text-primary-foreground font-semibold hover:scale-105 transition-transform duration-300 animate-glow">
              Start Trading
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}