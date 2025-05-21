"use client";

import { motion } from "framer-motion";
import { HStack, VStack, Wrap } from "~/components/HelperDivs";
import {
  Theme,
  THEME_OPTIONS,
} from "~/components/providers/Preferences-Provider";
import { Separator } from "~/components/Shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/Shadcn/tooltip";
import { capitalize } from "~/lib/utils";

const ThemeCell = ({ bgColor }: { bgColor: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            className={`h-20 w-20 rounded-md ${bgColor}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 17,
            }}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-background text-text">
          <p>{capitalize(bgColor.split("-")[1] as string)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ThemeDisplay = ({ theme }: { theme: Theme }) => {
  return (
    <VStack
      className={`${theme} rounded-md border-2 border-gray-600 bg-gray-500 px-6 py-2`}
      style={{
        fontFamily: `var(--theme-font-sans)`,
      }}
    >
      <h1 key={theme} className="mb-2 text-center text-2xl font-bold text-text">
        {capitalize(theme)}
      </h1>
      <HStack ySpacing="middle">
        <ThemeCell bgColor="bg-secondary" />
        <ThemeCell bgColor="bg-accent" />
        <ThemeCell bgColor="bg-background" />
        <ThemeCell bgColor="bg-foreground" />
        <ThemeCell bgColor="bg-muted" />
      </HStack>
    </VStack>
  );
};
export default function AllThemes() {
  return (
    <VStack>
      <h1 className="w-full text-center text-2xl font-bold">Dark Themes</h1>
      <Separator orientation="horizontal" />
      <Wrap>
        {Object.keys(THEME_OPTIONS.dark).map((theme) => {
          const themeClass = THEME_OPTIONS.dark[
            theme as keyof typeof THEME_OPTIONS.dark
          ] as Theme;

          return <ThemeDisplay theme={themeClass} />;
        })}
      </Wrap>
      <br />
      <h1 className="w-full text-center text-2xl font-bold">Light Themes</h1>
      <Separator orientation="horizontal" />
      <Wrap>
        {Object.keys(THEME_OPTIONS.light).map((theme) => {
          const themeClass = THEME_OPTIONS.light[
            theme as keyof typeof THEME_OPTIONS.light
          ] as Theme;

          return <ThemeDisplay theme={themeClass} />;
        })}
      </Wrap>
    </VStack>
  );
}
