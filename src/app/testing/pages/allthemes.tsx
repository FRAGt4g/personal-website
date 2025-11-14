"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { Grid, HStack, VStack, Wrap } from "~/components/HelperDivs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/Shadcn/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/Shadcn/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/Shadcn/popover";
import { Separator } from "~/components/Shadcn/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/Shadcn/tooltip";
import { capitalize } from "~/lib/utils";
import { type Theme, THEME_OPTIONS } from "~/styles/Themes";

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
          <p>{capitalize(bgColor.split("-")[1]!)}</p>
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
      <h1 className="mb-2 text-center text-2xl font-bold text-text">
        {capitalize(theme)}
      </h1>
      <Grid maxCols={4} y="middle" x="center">
        <ThemeCell bgColor="bg-primary" />
        <ThemeCell bgColor="bg-secondary" />
        <ThemeCell bgColor="bg-accent" />
        <ThemeCell bgColor="bg-background" />
        <ThemeCell bgColor="bg-foreground" />
        <ThemeCell bgColor="bg-muted" />
        <ThemeCell bgColor="bg-text" />
      </Grid>
    </VStack>
  );
};

type HexColor = `#${string}`;

type ThemeColorWays = {
  primary: HexColor | null;
  secondary: HexColor | null;
  accent: HexColor | null;
  background: HexColor | null;
  foreground: HexColor | null;
  muted: HexColor | null;
  text: HexColor | null;
};

const ColorInput = ({
  colorway,
  setColorway,
  color,
}: {
  colorway: keyof ThemeColorWays;
  setColorway: (colorway: HexColor) => void;
  color: HexColor | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div
          className="flex h-10 items-center justify-center rounded-md border-2 bg-background p-2 text-sm capitalize"
          style={{ backgroundColor: color ?? `var(--${colorway})` }}
        >
          {colorway}
        </div>
      </PopoverTrigger>
      <PopoverContent className="h-min w-min p-1">
        <ChromePicker
          onChange={(c: { hex: string }) => {
            setColorway(c.hex as HexColor);
          }}
          disableAlpha
          color={color ?? undefined}
        />
      </PopoverContent>
    </Popover>
  );
};

const CreateNewThemeDialog = () => {
  const [colors, setColors] = useState<ThemeColorWays>({
    primary: null,
    secondary: null,
    accent: null,
    background: null,
    foreground: null,
    muted: null,
    text: null,
  });
  const [font, setFont] = useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.button
          className="flex w-[80%] items-center justify-center gap-2 rounded-md bg-accent p-2 text-center text-2xl font-bold text-text"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 17,
          }}
        >
          Create New Theme
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new theme</DialogTitle>
        </DialogHeader>
        <HStack>
          <ColorInput
            colorway="primary"
            setColorway={(c) => setColors({ ...colors, primary: c })}
            color={colors.primary}
          />
          <ColorInput
            colorway="secondary"
            setColorway={(c) => setColors({ ...colors, secondary: c })}
            color={colors.secondary}
          />
          <ColorInput
            colorway="accent"
            setColorway={(c) => setColors({ ...colors, accent: c })}
            color={colors.accent}
          />
          <ColorInput
            colorway="background"
            setColorway={(c) => setColors({ ...colors, background: c })}
            color={colors.background}
          />
          <ColorInput
            colorway="foreground"
            setColorway={(c) => setColors({ ...colors, foreground: c })}
            color={colors.foreground}
          />
          <ColorInput
            colorway="muted"
            setColorway={(c) => setColors({ ...colors, muted: c })}
            color={colors.muted}
          />
          <ColorInput
            colorway="text"
            setColorway={(c) => setColors({ ...colors, text: c })}
            color={colors.text}
          />
        </HStack>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              style={{ fontFamily: `'${font || "sans-serif"}'` }}
              className="rounded-md border px-4 py-2"
            >
              {font || "Select a Font"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-64 overflow-y-auto p-1">
            {[
              "Inter",
              "Roboto",
              "Open Sans",
              "Lato",
              "Montserrat",
              "Poppins",
              "Source Sans Pro",
              "Ubuntu",
              "Raleway",
              "Nunito",
            ].map((font) => {
              const fontStyle = {
                fontFamily: `'${font}', sans-serif`,
              };

              return (
                <DropdownMenuItem
                  key={font}
                  onClick={() => setFont(font)}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-muted"
                  style={fontStyle}
                >
                  {font}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogFooter>
          <DialogClose asChild>
            <button>Cancel</button>
          </DialogClose>
          <button
            className="rounded-md bg-accent px-4 py-2 text-text"
            onClick={async () => {
              console.log(colors);
              const hslColors = Object.entries(colors).map(([key, value]) => {
                const hsl = hexToHSL(value!);
                return { [key]: `${hsl.h}% ${hsl.s}% ${hsl.l}%` };
              });
              console.log(hslColors);
              const vars = Object.entries(hslColors).map(([key, value]) => {
                return `--${key}: ${value[key]};`;
              });
              await navigator.clipboard.writeText(vars.join("\n"));
            }}
          >
            Create Theme
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

function hexToHSL(hex: HexColor) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const h =
    delta === 0
      ? 0
      : max === r
        ? (g - b) / delta
        : max === g
          ? 2 + (b - r) / delta
          : 4 + (r - g) / delta;
  const s = delta === 0 ? 0 : delta / (1 - Math.abs(max + min - 1));
  const l = (max + min) / 2;
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export default function AllThemes() {
  return (
    <VStack x="center">
      <CreateNewThemeDialog />
      <Separator orientation="horizontal" />
      <h1 className="w-full text-center text-2xl font-bold">Dark Themes</h1>
      <Separator orientation="horizontal" />
      <Wrap>
        {Object.keys(THEME_OPTIONS.dark).map((theme) => {
          const themeClass = THEME_OPTIONS.dark[
            theme as keyof typeof THEME_OPTIONS.dark
          ] as Theme;

          return <ThemeDisplay key={theme} theme={themeClass} />;
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

          return <ThemeDisplay key={theme} theme={themeClass} />;
        })}
      </Wrap>
    </VStack>
  );
}
