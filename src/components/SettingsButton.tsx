"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Settings2 } from "lucide-react";
import { useState } from "react";
import { cn } from "~/lib/utils";
import { THEME_OPTIONS } from "~/styles/Themes";
import { HStack, VStack } from "./HelperDivs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./Shadcn/dropdown-menu";

const tailwindCornerMap = {
  "bottom-left": "bottom-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-right": "bottom-2 right-2",
  "top-left": "top-2 left-2",
};

const SettingsButton = ({
  corner,
}: {
  corner: `${"bottom" | "top"}-${"left" | "right"}`;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const startX = corner.includes("left") ? -100 : 100;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: startX }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, x: startX }}
        className={cn(
          `${tailwindCornerMap[corner]} group fixed z-30 flex flex-row items-center justify-center`,
        )}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <motion.div
          className={cn(
            "h-10 w-10 rounded-3xl border-2 border-accent/30 bg-accent/30 p-2 shadow-lg shadow-secondary/90 backdrop:blur-md",
            isOpen && "h-20 w-64 rounded-lg",
          )}
          animate={{
            height: isOpen ? "7.5rem" : "2.5rem",
            width: isOpen ? "24rem" : "2.5rem",
            borderRadius: isOpen ? "0.5rem" : "1.5rem",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <Settings2 className="fixed right-4 top-4 font-bold" />
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <VStack className="w-full" xSpacing="right">
                <p className="text-lg font-bold">Settings</p>
                <HStack>
                  <p>Force Set a theme: </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <p>Select Theme</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Light Themes</DropdownMenuLabel>
                      {Object.keys(THEME_OPTIONS.light).map((index, theme) => (
                        <DropdownMenuItem key={index}>
                          <p>{THEME_OPTIONS.light[theme]}</p>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuLabel>Dark Themes</DropdownMenuLabel>
                      {Object.keys(THEME_OPTIONS.dark).map((index, theme) => (
                        <DropdownMenuItem key={index}>
                          <p>{THEME_OPTIONS.dark[theme]}</p>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </HStack>
                <HStack>
                  <p>Force Set a theme: </p>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <p>Select Theme</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Light Themes</DropdownMenuLabel>
                      {Object.keys(THEME_OPTIONS.light).map((index, theme) => (
                        <DropdownMenuItem key={index}>
                          <p>{THEME_OPTIONS.light[theme]}</p>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuLabel>Dark Themes</DropdownMenuLabel>
                      {Object.keys(THEME_OPTIONS.dark).map((index, theme) => (
                        <DropdownMenuItem key={index}>
                          <p>{THEME_OPTIONS.dark[theme]}</p>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </HStack>
              </VStack>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SettingsButton;
