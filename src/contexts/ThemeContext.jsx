import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "preferred-theme"; // 'light' | 'dark' | 'system'

const ThemeContext = createContext({
  theme: "system",
  resolvedTheme: "light",
  setTheme: (_theme) => {},
  toggleTheme: () => {},
  isDark: false,
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved || "system";
    } catch (_) {
      return "system";
    }
  });

  const systemPrefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolvedTheme = theme === "system" ? (systemPrefersDark ? "dark" : "light") : theme;

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement; // <html>
    root.setAttribute("data-theme", resolvedTheme);

    const classList = root.classList;
    if (resolvedTheme === "dark") {
      classList.add("dark");
    } else {
      classList.remove("dark");
    }

    if (theme === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        const isDark = mql.matches;
        root.setAttribute("data-theme", isDark ? "dark" : "light");
        if (isDark) classList.add("dark");
        else classList.remove("dark");
      };
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
  }, [theme, resolvedTheme]);

  const toggleTheme = () => {
    // If on system, toggle to explicit opposite of current resolved
    if (theme === "system") {
      setTheme(resolvedTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const isDark = resolvedTheme === "dark";

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, toggleTheme, isDark }),
    [theme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
