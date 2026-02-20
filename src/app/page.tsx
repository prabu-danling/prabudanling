"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Bookmark, X, ChevronRight, Sparkles } from "lucide-react";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { WorksSection } from "@/components/sections/works-section";
import { DreamLogSection } from "@/components/sections/dreamlog-section";
import { ArchiveSection } from "@/components/sections/archive-section";
import { ContactSection } from "@/components/sections/contact-section";
import { StatsSection } from "@/components/sections/stats-section";
import { QuoteCarousel } from "@/components/ui-custom/quote-carousel";
import { NewsletterSection } from "@/components/ui-custom/newsletter-section";
import { BookmarksPanel } from "@/components/ui-custom/bookmarks-panel";
import { MoodSelector } from "@/components/ui-custom/mood-selector";
import { WritingInsights } from "@/components/ui-custom/writing-insights";
import { CosmicBackground } from "@/components/ui-custom/cosmic-background";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";

// Progress bar component
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-dream-gold via-dream-green to-dream-blue origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

// Cursor follower effect (desktop only)
function CursorFollower() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = document.createElement("div");
    cursor.id = "cursor-follower";
    cursor.className = "fixed pointer-events-none z-[55] w-4 h-4 rounded-full mix-blend-difference transition-transform duration-150";
    cursor.style.background = "var(--dream-gold)";
    cursor.style.opacity = "0";
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = "0.5";
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = "0";
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = `${cursorX - 8}px`;
      cursor.style.top = `${cursorY - 8}px`;
      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cursor.remove();
    };
  }, []);

  return null;
}

// Loading screen
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      style={{ pointerEvents: "none" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-dream-gold border-t-transparent rounded-full mx-auto mb-4"
        />
        <span className="text-sm text-muted-foreground">Memuat mimpi...</span>
      </motion.div>
    </motion.div>
  );
}

// Floating action panel
function FloatingPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { bookmarks } = useAppStore();

  return (
    <>
      {/* Floating button - Responsive positioning */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50"
      >
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg shadow-dream-gold/20 bg-dream-gold/90 hover:bg-dream-gold text-background relative"
            >
              <Bookmark className="w-4 h-4 sm:w-5 sm:h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-dream-purple text-white text-[10px] sm:text-xs flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[85vw] sm:w-96 max-w-[90vw]">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Sparkles className="w-4 h-4 text-dream-gold" />
                Panel Personal
              </SheetTitle>
            </SheetHeader>
            <div className="mt-4 sm:mt-6">
              <Tabs defaultValue="bookmarks" className="w-full">
                <TabsList className="w-full grid grid-cols-3 h-9 sm:h-10">
                  <TabsTrigger value="bookmarks" className="text-xs sm:text-sm">Tersimpan</TabsTrigger>
                  <TabsTrigger value="mood" className="text-xs sm:text-sm">Mood</TabsTrigger>
                  <TabsTrigger value="insights" className="text-xs sm:text-sm">Stats</TabsTrigger>
                </TabsList>
                <TabsContent value="bookmarks" className="mt-3 sm:mt-4">
                  <BookmarksPanel />
                </TabsContent>
                <TabsContent value="mood" className="mt-3 sm:mt-4">
                  <MoodSelector />
                </TabsContent>
                <TabsContent value="insights" className="mt-3 sm:mt-4">
                  <WritingInsights />
                </TabsContent>
              </Tabs>
            </div>
          </SheetContent>
        </Sheet>
      </motion.div>
    </>
  );
}



export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Cosmic starfield background */}
      <CosmicBackground />
      
      {/* Loading screen */}
      <LoadingScreen />
      
      {/* Scroll progress */}
      <ScrollProgress />
      
      {/* Custom cursor */}
      <CursorFollower />
      
      {/* Navigation */}
      <Navigation />

      {/* Main content - with padding for fixed header */}
      <div className="flex-1 pt-16 sm:pt-20">
        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Quote Carousel */}
        <section className="py-16 bg-gradient-to-b from-card/30 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteCarousel />
          </div>
        </section>

        {/* Divider */}
        <div className="divider-dream container mx-auto" />

        {/* Works Section */}
        <WorksSection />

        {/* Stats Section */}
        <StatsSection />

        {/* Dream Log Section */}
        <DreamLogSection />

        {/* Archive Section */}
        <ArchiveSection />

        {/* Newsletter Section */}
        <section className="py-16 bg-gradient-to-b from-background to-card/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterSection />
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating panels */}
      <FloatingPanel />
    </main>
  );
}
