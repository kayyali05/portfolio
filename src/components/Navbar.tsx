import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-border/50 bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:h-20 md:px-6">
          {/* Logo */}
          <motion.a
            href="#"
            className="font-display text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">{portfolioData.personal.name.split(" ")[0]}</span>
            <span className="text-muted-foreground">.</span>
          </motion.a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {portfolioData.nav.map((item, index) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => handleNavClick(item.href)}
                  className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:block"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick("#contact")}
              className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="relative z-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {portfolioData.nav.map((item, index) => (
            <motion.button
              key={item.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMobileMenuOpen ? 1 : 0,
                y: isMobileMenuOpen ? 0 : 20,
              }}
              transition={{ delay: isMobileMenuOpen ? index * 0.1 : 0 }}
              onClick={() => handleNavClick(item.href)}
              className="font-display text-2xl font-medium text-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </motion.button>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              onClick={() => handleNavClick("#contact")}
              className="mt-4"
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
