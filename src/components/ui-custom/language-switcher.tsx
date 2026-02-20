"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Search, Check, ChevronRight, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLanguageStore, languages } from "@/lib/store/language-store";

// Group languages by region
const languageGroups = {
  "Southeast Asia": ["id", "su", "jv", "ms", "th", "vi", "tl", "my", "km", "lo"],
  "East Asia": ["zh", "zh-tw", "ja", "ko", "mn"],
  "South Asia": ["hi", "bn", "ta", "te", "ur"],
  "Middle East": ["ar", "fa", "tr", "he"],
  "Europe": ["en", "de", "fr", "es", "it", "pt", "ru", "nl", "pl", "uk", "cs", "sv", "no", "da", "fi", "el", "hu", "ro"],
  "Africa": ["sw", "af", "ar-eg"],
  "Americas": ["es-mx", "pt-br"],
  "Oceania": ["mi"],
};

export function LanguageSwitcher({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { currentLang, setLanguage } = useLanguageStore();

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Filter languages by search
  const filteredLanguages = useMemo(() => {
    if (!search) return languages;
    const searchLower = search.toLowerCase();
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchLower) ||
        lang.native.toLowerCase().includes(searchLower) ||
        lang.code.toLowerCase().includes(searchLower)
    );
  }, [search]);

  // Get current language info
  const currentLanguage = languages.find((l) => l.code === currentLang);

  // Handle language select
  const handleSelect = (code: string) => {
    setLanguage(code as any);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl max-h-[80vh] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-border bg-gradient-to-r from-dream-gold/5 to-dream-purple/5">
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-xl bg-dream-gold/10 flex items-center justify-center"
                >
                  <Languages className="w-5 h-5 text-dream-gold" />
                </motion.div>
                <div>
                  <h2 className="font-serif-display text-xl">50 Languages</h2>
                  <p className="text-sm text-muted-foreground">
                    Portal Kesadaran speaks your language
                  </p>
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search language..."
                  className="pl-10 bg-background/50"
                />
              </div>

              {/* Current Language Badge */}
              {currentLanguage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 flex items-center gap-2"
                >
                  <span className="text-sm text-muted-foreground">Current:</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dream-gold/10 text-dream-gold text-sm">
                    <span>{currentLanguage.flag}</span>
                    <span>{currentLanguage.name}</span>
                  </span>
                </motion.div>
              )}
            </div>

            {/* Language Grid */}
            <ScrollArea className="h-[50vh]">
              <div className="p-6">
                {search ? (
                  // Search Results
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {filteredLanguages.map((lang, index) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => handleSelect(lang.code)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                          "hover:bg-dream-gold/10 hover:border-dream-gold/30 border border-transparent",
                          currentLang === lang.code && "bg-dream-gold/10 border-dream-gold/30"
                        )}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="text-left flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{lang.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{lang.native}</p>
                        </div>
                        {currentLang === lang.code && (
                          <Check className="w-4 h-4 text-dream-gold" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                ) : (
                  // Grouped Languages
                  <div className="space-y-6">
                    {Object.entries(languageGroups).map(([groupName, codes], groupIndex) => {
                      const groupLanguages = codes
                        .map((code) => languages.find((l) => l.code === code))
                        .filter(Boolean);

                      if (groupLanguages.length === 0) return null;

                      return (
                        <motion.div
                          key={groupName}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: groupIndex * 0.05 }}
                        >
                          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                            <Globe className="w-4 h-4" />
                            {groupName}
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {groupLanguages.map((lang, index) => (
                              <motion.button
                                key={lang!.code}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.02 }}
                                onClick={() => handleSelect(lang!.code)}
                                className={cn(
                                  "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                                  "hover:bg-dream-gold/10 hover:border-dream-gold/30 border border-transparent",
                                  currentLang === lang!.code && "bg-dream-gold/10 border-dream-gold/30"
                                )}
                              >
                                <span className="text-2xl">{lang!.flag}</span>
                                <div className="text-left flex-1 min-w-0">
                                  <p className="font-medium text-sm truncate">{lang!.name}</p>
                                  <p className="text-xs text-muted-foreground truncate">{lang!.native}</p>
                                </div>
                                {currentLang === lang!.code && (
                                  <Check className="w-4 h-4 text-dream-gold" />
                                )}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="p-4 border-t border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  🌍 Portal Kesadaran - 50 Languages Available
                </p>
                <Button variant="ghost" size="sm" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Compact language button for navigation
export function LanguageButton({ onClick }: { onClick: () => void }) {
  const { currentLang } = useLanguageStore();
  const currentLanguage = languages.find((l) => l.code === currentLang);

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
    >
      <span className="text-lg">{currentLanguage?.flag || "🌍"}</span>
      <span className="text-sm hidden sm:inline">{currentLanguage?.code.toUpperCase()}</span>
    </motion.button>
  );
}
