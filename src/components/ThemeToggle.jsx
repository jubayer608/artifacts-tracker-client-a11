import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle text-primary hover:bg-base-200 transition-all duration-300"
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <FiSun className="text-xl" />
      ) : (
        <FiMoon className="text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;