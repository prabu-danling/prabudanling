"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Feather, Globe, BookOpen, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui-custom/language-switcher";
import { useLanguageStore, languages } from "@/lib/store/language-store";

// Navigation links
const navLinks = [
  { href: "#beranda", label: "Beranda" },
  { href: "#tentang", label: "Tentang" },
  { href: "#karya", label: "Karya" },
  { href: "#dreamlog", label: "Dream Log" },
  { href: "#arsip", label: "Arsip" },
  { href: "#kontak", label: "Kontak" },
];

// Extra pages
const extraLinks = [
  { href: "/hikayat", label: "Hikayat", icon: BookOpen },
  { href: "/polyglot", label: "Polyglot", icon: Globe },
];

// Custom hook for mounted state
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [showLanguages, setShowLanguages] = useState(false);
  const { theme, setTheme } = useTheme();
  const { currentLang } = useLanguageStore();
  const mounted = useMounted();
  const currentLanguage = languages.find(l => l.code === currentLang);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Determine active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-border/20 py-3"
            : "bg-background/80 backdrop-blur-md py-4"
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("#beranda")}
              className="flex items-center gap-2.5 group flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Feather className="w-6 h-6 text-dream-gold transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 bg-dream-gold/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-serif-display text-lg leading-tight tracking-tight">
                  Santri Angon
                </span>
                <span className="text-[0.65rem] text-muted-foreground tracking-widest uppercase">
                  Prabu Danling
                </span>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-300",
                    activeSection === link.href.slice(1)
                      ? "text-dream-gold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 0 }}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-dream-gold rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1">
              {/* Extra Links - Desktop only with text */}
              <div className="hidden lg:flex items-center gap-1 mr-2">
                {extraLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                    </motion.a>
                  );
                })}
                <div className="w-px h-5 bg-border mx-1" />
              </div>

              {/* Extra Links - Mobile/Tablet as icon only */}
              <div className="flex lg:hidden items-center gap-0.5 mr-1">
                {extraLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50"
                      title={link.label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
                <div className="w-px h-5 bg-border mx-1" />
              </div>

              {/* Language Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowLanguages(true)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg hover:bg-muted/50 transition-colors"
                title={currentLanguage?.name}
              >
                <span className="text-lg">{currentLanguage?.flag || "🌍"}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">{currentLanguage?.code.toUpperCase()}</span>
              </motion.button>

              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="relative w-9 h-9"
                >
                  <AnimatePresence mode="wait">
                    {theme === "dark" ? (
                      <motion.div
                        key="sun"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun className="w-5 h-5 text-dream-gold" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="moon"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <span className="sr-only">Toggle theme</span>
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden relative w-9 h-9"
                onClick={() => setIsOpen(!isOpen)}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Content */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-card border-l border-border flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <span className="font-serif-display text-lg">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="w-8 h-8">
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={cn(
                        "px-4 py-2.5 text-base font-medium rounded-lg transition-colors",
                        activeSection === link.href.slice(1)
                          ? "bg-dream-gold/10 text-dream-gold"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </div>

                {/* Extra Links */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="px-4 mb-2 text-xs text-muted-foreground uppercase tracking-wider">Halaman</p>
                  {extraLinks.map((link, index) => {
                    const Icon = link.icon;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + index * 0.03 }}
                        className="flex items-center gap-3 px-4 py-2.5 text-base font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Icon className="w-5 h-5" />
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Settings Section */}
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="px-4 mb-2 text-xs text-muted-foreground uppercase tracking-wider">Pengaturan</p>
                  
                  {/* Language Selector */}
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setShowLanguages(true), 300);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-base font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    <div className="flex items-center gap-3">
                      <Languages className="w-5 h-5" />
                      <span>Bahasa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-base">{currentLanguage?.flag}</span>
                      <span className="text-sm text-muted-foreground">{currentLanguage?.name}</span>
                    </div>
                  </motion.button>

                  {/* Theme Toggle */}
                  {mounted && (
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.35 }}
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-base font-medium rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
                    >
                      <div className="flex items-center gap-3">
                        {theme === "dark" ? (
                          <Moon className="w-5 h-5" />
                        ) : (
                          <Sun className="w-5 h-5" />
                        )}
                        <span>Tema</span>
                      </div>
                      <span className="text-sm text-muted-foreground capitalize">
                        {theme === "dark" ? "Gelap" : "Terang"}
                      </span>
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-4 border-t border-border bg-muted/20">
                <p className="text-center text-xs text-muted-foreground italic">
                  &ldquo;Ulah edan, kudu eling&rdquo;
                </p>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Switcher Modal */}
      <LanguageSwitcher isOpen={showLanguages} onClose={() => setShowLanguages(false)} />
    </>
  );
}
