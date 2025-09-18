import { AnimatePresence, motion } from "framer-motion";
import { Dice5Icon, Moon, Sun, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { THEME_OPTIONS, type Theme } from "~/styles/Themes";
import { usePreferences } from "./providers/Preferences-Provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
} from "./Shadcn/select";

const DarkModeToggle = (props: React.ComponentProps<typeof motion.button>) => {
  const { toggleDarkMode, isDarkMode } = usePreferences();

  return (
    <motion.button
      onClick={(e) => {
        toggleDarkMode();
        props.onClick?.(e);
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
      {...props}
    >
      {isDarkMode() ? <Sun /> : <Moon />}
    </motion.button>
  );
};

export const SuperThemeToggle = () => {
  const { applyRandomTheme, applyTheme, theme } = usePreferences();
  const [open, setOpen] = useState(false);
  const lastPressDownRef = useRef<number>(new Date().getTime());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clickWindow = 300;

  return (
    <motion.div
      onMouseDown={() => {
        if (open) return;
        lastPressDownRef.current = new Date().getTime();
        timeoutRef.current = setTimeout(
          () => setOpen((prev) => !prev),
          clickWindow,
        );
      }}
      onMouseUp={() => {
        if (open) return;
        const timeSinceLastPressDown =
          new Date().getTime() - lastPressDownRef.current;
        if (timeSinceLastPressDown < clickWindow) {
          // Clicked the button
          applyRandomTheme();
          setOpen(false);
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
        }
      }}
      whileHover={{ scale: !open ? 1.1 : 1 }}
      whileTap={{ scale: !open ? 0.9 : 1 }}
      animate={{
        width: open ? "300px" : "40px",
      }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 17,
        duration: Math.max(0.2, clickWindow / 1000),
      }}
      className={cn(
        "flex flex-row items-center justify-between gap-2 rounded-full bg-primary p-2 text-background",
      )}
      style={{
        cursor: open ? "default" : "pointer",
      }}
    >
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              animate={{
                opacity: open ? 1 : 0,
                width: open ? "15rem" : "0rem",
              }}
              transition={{ duration: 0.2 }}
              className="flex flex-row items-center justify-between gap-4"
            >
              <DarkModeToggle
                onMouseDown={(e) => e.stopPropagation()}
                onMouseUp={(e) => e.stopPropagation()}
              />
              <Select
                onValueChange={(value) => applyTheme(value as Theme)}
                value={theme}
              >
                <SelectTrigger className="text-md border-none font-bold outline-none">
                  <div className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                    Choose Specific Theme
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-background text-text">
                  <SelectGroup>
                    <SelectLabel>Dark Themes</SelectLabel>
                    {THEME_OPTIONS.dark.map((theme) => (
                      <SelectItem
                        key={theme}
                        value={theme}
                        className="capitalize"
                      >
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Light Themes</SelectLabel>
                    {THEME_OPTIONS.light.map((theme) => (
                      <SelectItem
                        key={theme}
                        value={theme}
                        className="capitalize"
                      >
                        {theme}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </motion.div>
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: open ? 180 : 0 }}
              className="h-min w-min cursor-pointer"
              exit={{ rotate: 0, opacity: 0 }}
              onMouseDown={(e) => e.stopPropagation()}
              onMouseUp={(e) => e.stopPropagation()}
              onClick={() => {
                setOpen(false);
              }}
            >
              <XIcon />
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: open ? 180 : 0 }}
            className="h-min w-min"
          >
            <Dice5Icon />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
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
  const { applyTheme, getApplicableThemes } = usePreferences();

  return (
    <motion.button
      onClick={() => {
        if (getApplicableThemes().includes(theme)) {
          applyTheme(theme);
        }
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Dice5Icon />
    </motion.button>
  );
};

export default DarkModeToggle;
