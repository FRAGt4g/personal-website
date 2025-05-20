"use client";

import { motion } from "framer-motion";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { cn } from "~/lib/utils";

const FADE_DURATION = 200;
const PageBlur = () => {
  const pageBlur = document.getElementById("page-blur")?.dataset;

  return (
    <motion.div
      layoutId="page-blur"
      id="page-blur"
      data-blur="false"
      style={{
        transitionDuration: `${FADE_DURATION}ms`,
      }}
      className={cn(
        "pointer-events-none fixed inset-0 z-50 h-screen w-screen transition-all",
        "data-[blur=false]:bg-transparent data-[blur=false]:backdrop-blur-none",
        "data-[blur=true]:bg-black/90 data-[blur=true]:backdrop-blur-3xl",
      )}
    />
  );
};

export function playBlur(color: string) {
  const pageBlur = document.getElementById("page-blur");
  if (!pageBlur) {
    return;
  }
  pageBlur.dataset.blur = "true";
  pageBlur.style.backgroundColor = color;
  setTimeout(() => {
    pageBlur.dataset.blur = "false";
    pageBlur.style.backgroundColor = "transparent";
  }, FADE_DURATION);
}

export function goTo(router: AppRouterInstance, path: string) {
  const pageBlur = document.getElementById("page-blur");

  if (!pageBlur) {
    router.push(path);
    return;
  }

  pageBlur.dataset.blur = "true";
  setTimeout(() => {
    pageBlur.dataset.blur = "false";
    router.push(path);
  }, FADE_DURATION);
}

export default PageBlur;
