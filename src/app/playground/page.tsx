"use client";

import { useEffect } from "react";
import { VStack } from "~/components/HelperDivs";
import { useMousePosition } from "~/components/useMousePosition";
import { useBackground } from "~/providers/BackgroundProvider";

const BlogPage = () => {
  return (
    <VStack ySpacing="top" xSpacing="center" className="w-full">
      <HeroBanner />
    </VStack>
  );
};

const HeroBanner = () => {
  const { spawnRandomBlobWithPosition, spawnRandomBlob } = useBackground();
  const mousePosition = useMousePosition();

  useEffect(() => {
    function handleMouseDown() {
      console.log("mouse down");
      // spawnRandomBlob();
      spawnRandomBlobWithPosition({
        x: mousePosition.x,
        y: mousePosition.y,
      });
    }

    window.addEventListener("dblclick", handleMouseDown);
    return () => {
      window.removeEventListener("dblclick", handleMouseDown);
    };
  }, [mousePosition, spawnRandomBlobWithPosition]);

  return (
    <VStack centered gap={20} className="h-[100vh] w-full">
      <button
        onClick={() => spawnRandomBlob()}
        className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground"
      >
        Click me
      </button>
    </VStack>
  );
};

export default BlogPage;
