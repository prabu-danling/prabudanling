import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LanguageCode, languages, getTranslation } from "../i18n/translations";

interface LanguageState {
  currentLang: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: () => ReturnType<typeof getTranslation>;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLang: "id" as LanguageCode,
      
      setLanguage: (lang: LanguageCode) => {
        set({ currentLang: lang });
        // Update HTML lang attribute
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang;
        }
      },
      
      t: () => {
        return getTranslation(get().currentLang);
      },
    }),
    {
      name: "portal-language",
    }
  )
);

export { languages, getTranslation };
