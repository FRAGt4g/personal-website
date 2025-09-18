"use client";

import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";
import { TextReveal } from "./basics/reveal";
import BetterLink from "./BetterLink";
import { SuperThemeToggle } from "./DarkModeToggle";
import GradientText from "./GradientText";
interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { label: "About Me", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Resume", href: "/resume" },
];

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState<boolean>(false);
  const [atTopOfPage, setAtTopOfPage] = useState<boolean>(true);
  const pathname = usePathname();

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

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

  useEffect(() => {
    setAtTopOfPage(window.scrollY === 0);
    const handleScroll = () => {
      setAtTopOfPage(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-10">
      <nav
        className={cn(
          "w-full border-b py-3 transition-all duration-300",
          atTopOfPage
            ? "border-transparent bg-transparent"
            : "border-neutral-700/80 bg-background/80 backdrop-blur-2xl",
        )}
      >
        <div className="relative mx-auto w-full max-w-screen-xl px-4 lg:text-sm">
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
              <SuperThemeToggle />
            </div>
            <div className="flex-col justify-end md:flex lg:hidden">
              <button onClick={toggleNavbar}>
                {mobileDrawerOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
          {mobileDrawerOpen && (
            <div className="fixed right-0 z-20 flex w-full flex-col items-center justify-center bg-neutral-900 p-12 lg:hidden">
              <ul>
                <Links />
              </ul>
              <div className="flex space-x-6">
                <a href="#" className="rounded-md border px-3 py-2">
                  Sign In
                </a>
                <a
                  href="#"
                  className="rounded-md bg-gradient-to-r from-orange-200 to-orange-300 px-3 py-2"
                >
                  Create an account
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
