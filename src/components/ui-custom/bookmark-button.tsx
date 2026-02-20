"use client";

import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/store/app-store";

interface BookmarkButtonProps {
  id: string;
  type: "work" | "dreamlog";
  title: string;
}

export function BookmarkButton({ id, type, title }: BookmarkButtonProps) {
  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useAppStore();
  const bookmarked = isBookmarked(id);

  const handleToggle = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark({
        id,
        type,
        title,
        savedAt: new Date().toISOString(),
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "w-9 h-9 transition-all duration-300",
        bookmarked && "text-dream-gold"
      )}
    >
      <motion.div
        initial={false}
        animate={{ scale: bookmarked ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {bookmarked ? (
          <BookmarkCheck className="w-4 h-4 fill-current" />
        ) : (
          <Bookmark className="w-4 h-4" />
        )}
      </motion.div>
    </Button>
  );
}
