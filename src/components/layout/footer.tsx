"use client";

import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { 
  Feather, Heart, Moon, Sun, 
  Twitter, Instagram, Youtube, 
  Facebook, Linkedin, Rss
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const footerLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Karya", href: "#karya" },
  { label: "Dream Log", href: "#dreamlog" },
  { label: "Arsip", href: "#arsip" },
  { label: "Kontak", href: "#kontak" },
];

// Complete social media links with icons
const socialLinks = [
  // Western
  { label: "Twitter/X", href: "https://twitter.com/santriangon", icon: Twitter, group: "western" },
  { label: "Instagram", href: "https://instagram.com/santriangon", icon: Instagram, group: "western" },
  { label: "Medium", href: "https://medium.com/@santriangon", icon: Rss, group: "western" },
  { label: "Facebook", href: "https://facebook.com/santriangon", icon: Facebook, group: "western" },
  { label: "LinkedIn", href: "https://linkedin.com/in/santriangon", icon: Linkedin, group: "western" },
  { label: "YouTube", href: "https://youtube.com/@santriangon", icon: Youtube, group: "western" },
  // Russia
  { label: "VK", href: "https://vk.com/santriangon", icon: null, group: "russia" },
  { label: "Telegram", href: "https://t.me/santriangon", icon: null, group: "russia" },
  // China
  { label: "Weibo", href: "https://weibo.com/santriangon", icon: null, group: "china" },
  { label: "WeChat", href: "weixin://contacts/profile/santriangon", icon: null, group: "china" },
];

// Custom hook for mounted state without triggering setState in effect
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

// Social media icon component
function SocialIcon({ name }: { name: string }) {
  const iconMap: Record<string, JSX.Element> = {
    "Twitter/X": <Twitter className="w-4 h-4" />,
    "Instagram": <Instagram className="w-4 h-4" />,
    "Medium": <Rss className="w-4 h-4" />,
    "Facebook": <Facebook className="w-4 h-4" />,
    "LinkedIn": <Linkedin className="w-4 h-4" />,
    "YouTube": <Youtube className="w-4 h-4" />,
    "VK": <span className="text-xs font-bold">VK</span>,
    "Telegram": <span className="text-xs">✈</span>,
    "Weibo": <span className="text-xs font-bold">微</span>,
    "WeChat": <span className="text-xs">💬</span>,
  };
  return iconMap[name] || <span className="text-xs">{name[0]}</span>;
}

export function Footer() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative border-t border-border/30 bg-card/30">
      {/* Main footer content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand column */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <Feather className="w-5 h-5 text-dream-gold" />
                <span className="font-serif-display text-lg">Santri Angon</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs">
                Membangkitkan kesadaran diri, mencerdaskan kehidupan bangsa, dan ikut melaksanakan ketertiban dunia.
              </p>
              <div className="text-sm italic text-muted-foreground">
                &ldquo;Prak burukeun, ulah edan, kudu eling&rdquo;
              </div>
              
              {/* Social icons row */}
              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      "bg-muted/50 hover:bg-dream-gold/20 border border-border/50",
                      "text-muted-foreground hover:text-dream-gold",
                      "transition-colors duration-300"
                    )}
                    title={link.label}
                  >
                    <SocialIcon name={link.label} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Navigation column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-medium text-sm">Navigasi</h4>
              <nav className="space-y-2">
                {footerLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-sm text-muted-foreground hover:text-dream-gold transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          </div>

          {/* Connect column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-medium text-sm">Terhubung</h4>
              
              {/* Social links by region */}
              <div className="space-y-3">
                {/* Western */}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Western</p>
                  <div className="space-y-1">
                    {socialLinks.filter(l => l.group === "western").slice(0, 4).map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-muted-foreground hover:text-dream-gold transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
                
                {/* Russia & China */}
                <div className="flex gap-4">
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">Russia</p>
                    <div className="space-y-1">
                      {socialLinks.filter(l => l.group === "russia").map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-muted-foreground hover:text-dream-gold transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1.5">China</p>
                    <div className="space-y-1">
                      {socialLinks.filter(l => l.group === "china").map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-muted-foreground hover:text-dream-gold transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Theme toggle */}
              <div className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="rounded-full"
                >
                  {mounted ? (
                    theme === "dark" ? (
                      <>
                        <Sun className="w-4 h-4 mr-2" />
                        Mode Terang
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 mr-2" />
                        Mode Gelap
                      </>
                    )
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Mode Gelap
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 flex-wrap justify-center sm:justify-start">
              <span>© {new Date().getFullYear()}</span>
              <span>Santri Angon / Prabu Danling</span>
              <span className="text-muted-foreground/50 mx-2">•</span>
              <span>15+ Tahun Menulis (Sejak 2009)</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Dibuat dengan</span>
              <Heart className="w-4 h-4 text-dream-gold fill-dream-gold/20" />
              <span>di Indonesia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
