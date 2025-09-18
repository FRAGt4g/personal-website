"use client";

import { useState } from "react";
import { VStack } from "~/components/HelperDivs";

export default function Home() {
  const pseudoRandom = (i: number) => (Math.abs(Math.sin(i * 9999)) % 1) + 0.5; // value in [0.5,1.5)
  const [trigger, setTrigger] = useState(false);
  return (
    <div className="flex h-safe-area flex-col">
      <VStack className="ml-10 mt-24" ySpacing="top" xSpacing="center">
        here is where anything random stuff I wanna say will go
      </VStack>
    </div>
  );
}
