import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═════════════════════════════════════════
        // BASE COLORS - Semantic Tokens
        // ═════════════════════════════════════════
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // ═════════════════════════════════════════
        // SURFACE COLORS
        // ═════════════════════════════════════════
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        
        // ═════════════════════════════════════════
        // BRAND COLORS
        // ═════════════════════════════════════════
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        
        // ═════════════════════════════════════════
        // SEMANTIC COLORS
        // ═════════════════════════════════════════
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        
        // ═════════════════════════════════════════
        // UI COLORS
        // ═════════════════════════════════════════
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        
        // ═════════════════════════════════════════
        // DREAM BRAND COLORS - Portal Kesadaran
        // ═════════════════════════════════════════
        "dream-gold": {
          DEFAULT: "var(--dream-gold)",
          foreground: "var(--dream-gold-foreground)",
        },
        "dream-green": {
          DEFAULT: "var(--dream-green)",
          foreground: "var(--dream-green-foreground)",
        },
        "dream-blue": {
          DEFAULT: "var(--dream-blue)",
          foreground: "var(--dream-blue-foreground)",
        },
        "dream-purple": {
          DEFAULT: "var(--dream-purple)",
          foreground: "var(--dream-purple-foreground)",
        },
        
        // ═════════════════════════════════════════
        // CHART COLORS
        // ═════════════════════════════════════════
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        
        // ═════════════════════════════════════════
        // SIDEBAR COLORS
        // ═════════════════════════════════════════
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // ═════════════════════════════════════════
      // ANIMATION TIMING
      // ═════════════════════════════════════════
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
      },
      
      // ═════════════════════════════════════════
      // CUSTOM KEYFRAMES
      // ═════════════════════════════════════════
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
