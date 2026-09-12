import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../store/themeStore";

const ThemeToggle = ({ className = "" }) => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`theme-toggle ${className}`}
    >
      <Sun className="theme-toggle__sun" size={17} aria-hidden="true" />
      <Moon className="theme-toggle__moon" size={17} aria-hidden="true" />
      <span className="sr-only">{isDark ? "Light theme" : "Dark theme"}</span>
    </button>
  );
};

export default ThemeToggle;
