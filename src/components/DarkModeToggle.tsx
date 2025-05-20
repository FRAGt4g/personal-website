import { motion } from "framer-motion";
import { Dice5Icon, Moon, Sun } from "lucide-react";
import { Theme, usePreferences } from "./providers/Preferences-Provider";

const DarkModeToggle = () => {
  const { toggleDarkMode, isDarkMode } = usePreferences();

  return (
    <motion.button
      onClick={() => {
        toggleDarkMode();
        console.log(isDarkMode());
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ rotate: isDarkMode() ? 180 : 0 }}
      animate={{
        rotate: isDarkMode() ? 180 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 17,
      }}
    >
      {isDarkMode() ? <Sun /> : <Moon />}
    </motion.button>
  );
};

export const RandomThemeToggle = () => {
  const { applyRandomTheme } = usePreferences();

  return (
    <motion.button
      onClick={() => {
        applyRandomTheme();
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Dice5Icon />
    </motion.button>
  );
};

export const SetThemeToSpecificTheme = ({ theme }: { theme: Theme }) => {
  const { setTheme } = usePreferences();

  return (
    <motion.button
      onClick={() => {
        setTheme(theme);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Dice5Icon />
    </motion.button>
  );
};

export default DarkModeToggle;
