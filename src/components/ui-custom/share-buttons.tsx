"use client";

import { motion } from "framer-motion";
import { Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
  excerpt?: string;
}

const sharePlatforms = [
  {
    name: "Twitter",
    icon: Twitter,
    getUrl: (title: string, url: string) => 
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    color: "hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50",
  },
  {
    name: "Facebook",
    icon: Facebook,
    getUrl: (_, url: string) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "hover:bg-[#4267B2]/10 hover:text-[#4267B2] hover:border-[#4267B2]/50",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    getUrl: (title: string, url: string) => 
      `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    color: "hover:bg-[#0077B5]/10 hover:text-[#0077B5] hover:border-[#0077B5]/50",
  },
];

export function ShareButtons({ title, url, excerpt }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground mr-2">Bagikan:</span>
      
      {sharePlatforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <motion.div
            key={platform.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="icon"
              className={cn(
                "w-8 h-8 rounded-full transition-all duration-300",
                platform.color
              )}
              onClick={() => {
                window.open(
                  platform.getUrl(title, url),
                  "_blank",
                  "width=600,height=400"
                );
              }}
              title={`Share to ${platform.name}`}
            >
              <Icon className="w-4 h-4" />
            </Button>
          </motion.div>
        );
      })}

      {/* Copy link button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "w-8 h-8 rounded-full transition-all duration-300",
            copied
              ? "bg-dream-green/10 text-dream-green border-dream-green/50"
              : "hover:bg-dream-gold/10 hover:text-dream-gold hover:border-dream-gold/50"
          )}
          onClick={handleCopyLink}
          title="Copy link"
        >
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
        </Button>
      </motion.div>
    </div>
  );
}
