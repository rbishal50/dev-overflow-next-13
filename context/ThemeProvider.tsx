"use client";

import React, { useState, createContext, useContext, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// Create theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create theme provider
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hooks for other client components to use
export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider!");
  }

  return context;
}
