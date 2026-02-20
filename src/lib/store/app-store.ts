import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
interface Bookmark {
  id: string;
  type: "work" | "dreamlog";
  title: string;
  savedAt: string;
}

interface ReadingProgress {
  workId: string;
  progress: number; // 0-100
  lastRead: string;
}

interface AppState {
  // Bookmarks
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;

  // Reading Progress
  readingProgress: ReadingProgress[];
  updateProgress: (workId: string, progress: number) => void;
  getProgress: (workId: string) => number;

  // Theme Preferences
  preferredTheme: "dark" | "light";
  setPreferredTheme: (theme: "dark" | "light") => void;

  // Font Size
  fontSize: "small" | "medium" | "large";
  setFontSize: (size: "small" | "medium" | "large") => void;

  // Mood
  currentMood: string | null;
  setCurrentMood: (mood: string | null) => void;

  // Search History
  searchHistory: string[];
  addSearchTerm: (term: string) => void;
  clearSearchHistory: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Bookmarks
      bookmarks: [],
      addBookmark: (bookmark) =>
        set((state) => ({
          bookmarks: [...state.bookmarks, bookmark],
        })),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.id !== id),
        })),
      isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),

      // Reading Progress
      readingProgress: [],
      updateProgress: (workId, progress) =>
        set((state) => {
          const existing = state.readingProgress.find((p) => p.workId === workId);
          if (existing) {
            return {
              readingProgress: state.readingProgress.map((p) =>
                p.workId === workId
                  ? { ...p, progress, lastRead: new Date().toISOString() }
                  : p
              ),
            };
          }
          return {
            readingProgress: [
              ...state.readingProgress,
              { workId, progress, lastRead: new Date().toISOString() },
            ],
          };
        }),
      getProgress: (workId) => {
        const progress = get().readingProgress.find((p) => p.workId === workId);
        return progress?.progress ?? 0;
      },

      // Theme Preferences
      preferredTheme: "dark",
      setPreferredTheme: (theme) => set({ preferredTheme: theme }),

      // Font Size
      fontSize: "medium",
      setFontSize: (size) => set({ fontSize: size }),

      // Mood
      currentMood: null,
      setCurrentMood: (mood) => set({ currentMood: mood }),

      // Search History
      searchHistory: [],
      addSearchTerm: (term) =>
        set((state) => ({
          searchHistory: [term, ...state.searchHistory.filter((t) => t !== term)].slice(0, 10),
        })),
      clearSearchHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "santri-angon-storage",
    }
  )
);
