"use client";

import { AnimatePresence, motion } from "framer-motion";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { capitalize, cn } from "~/lib/utils";
import { usePreferences } from "../providers/Preferences-Provider";

const ThemeIndicator = ({
  corner,
}: {
  corner: `${"bottom" | "top"}-${"left" | "right"}`;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const tailwindCornerMap = {
    "bottom-left": "bottom-0 left-0 ml-2 mb-2",
    "top-right": "top-0 right-0 mr-2 mt-2",
    "bottom-right": "bottom-0 right-0 mr-2 mb-2",
    "top-left": "top-0 left-0 ml-2 mt-2",
  };

  const startX = corner.includes("left") ? -100 : 100;
  const { theme } = usePreferences();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: startX }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, x: startX }}
          className={`${tailwindCornerMap[corner]} group fixed flex flex-row items-center justify-center`}
        >
          <motion.button
            className={cn(
              "-z-10 flex flex-row items-center justify-center rounded-full bg-gray-500/20 p-1 transition-all duration-300 group-hover:bg-gray-500/30",
              corner.includes("right") && "-mr-10 group-hover:mr-2",
              corner.includes("left") && "-ml-10 group-hover:ml-2",
            )}
            exit={{ opacity: 0, x: startX }}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <XIcon className="h-3 w-3" />
          </motion.button>
          <div
            className={cn(
              `rounded-md border border-accent bg-accent/90 px-2 font-bold shadow-md shadow-secondary/20`,
            )}
          >
            {`Theme: ${capitalize(theme)}`}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ThemeIndicator;
