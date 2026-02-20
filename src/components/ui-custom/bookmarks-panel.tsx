"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, Trash2, BookOpen, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppStore } from "@/lib/store/app-store";
import { cn } from "@/lib/utils";

export function BookmarksPanel() {
  const { bookmarks, removeBookmark } = useAppStore();

  if (bookmarks.length === 0) {
    return (
      <Card className="bg-card/30 border-border/30">
        <CardContent className="p-8 text-center">
          <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-muted-foreground mb-2">
            Belum ada yang disimpan
          </p>
          <p className="text-xs text-muted-foreground/70">
            Klik ikon bookmark pada karya untuk menyimpannya di sini
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card/30 border-border/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-dream-gold" />
            Tersimpan ({bookmarks.length})
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-80">
          <div className="p-4 pt-0 space-y-2">
            <AnimatePresence>
              {bookmarks.map((bookmark) => {
                const Icon = bookmark.type === "work" ? BookOpen : Moon;
                return (
                  <motion.div
                    key={bookmark.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        bookmark.type === "work" ? "bg-dream-gold/10" : "bg-dream-blue/10"
                      )}>
                        <Icon className={cn(
                          "w-4 h-4",
                          bookmark.type === "work" ? "text-dream-gold" : "text-dream-blue"
                        )} />
                      </div>
                      <div>
                        <p className="font-medium text-sm line-clamp-1">{bookmark.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(bookmark.savedAt).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeBookmark(bookmark.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
