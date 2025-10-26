"use client";

import { usePathname } from "next/navigation";
import useTopOfScreen from "~/hooks/useTopOfScreen";
import { cn } from "~/lib/utils";
import { TextReveal } from "./basics/reveal";
import BetterLink from "./BetterLink";
import Container from "./Container";
import DarkModeToggle from "./DarkModeToggle";
import GradientText from "./GradientText";
interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  // { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

const Navbar = () => {
  const { atTopOfPage } = useTopOfScreen();
  const pathname = usePathname();

  const Links: React.FC = () => {
    return navItems.map((item: NavItem, index: number) => {
      const isActive = item.href === pathname;
      return (
        <BetterLink
          key={index}
          href={item.href}
          className={cn(
            // "relative py-2 after:absolute after:bottom-2 after:left-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-primary after:to-accent after:transition-all hover:after:w-full",
            "relative py-2",
            isActive ? "font-bold" : "opacity-70",
          )}
        >
          {isActive ? <TextReveal>{item.label}</TextReveal> : item.label}
        </BetterLink>
      );
    });
  };

  return (
    <header className="max-w-navbar fixed left-1/2 top-4 z-10 w-full -translate-x-1/2">
      <Container
        className="mx-auto w-full py-4"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: atTopOfPage ? 0 : 1, y: atTopOfPage ? -100 : 0 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        <nav className="relative mx-auto w-full px-4 lg:text-sm">
          <div className="flex items-center justify-between">
            <BetterLink href="/" className="p-0">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-xl tracking-tight">
                  <GradientText>Miles Fritzmather</GradientText>
                </span>
              </div>
            </BetterLink>
            <div className="absolute left-1/2 flex -translate-x-1/2 flex-row gap-4">
              <Links />
            </div>
            <div className="flex flex-row items-center justify-end gap-4 space-x-6 lg:space-x-0">
              <DarkModeToggle />
              {/* <SuperThemeToggle /> */}
            </div>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
