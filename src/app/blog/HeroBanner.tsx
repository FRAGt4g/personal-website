"use client";

import BouncingArrow from "~/components/bouncing-arrow";
import { FadeIn } from "~/components/fade-in";
import { VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";
import useScrollValue from "~/hooks/useScrollValue";

export default function HeroBanner() {
  const scrollValue = useScrollValue({
    start: 0,
    end: 1000,
    minValue: 0,
    maxValue: 1,
  });

  return (
    <VStack centered gap={20} className="h-[100vh] w-full">
      <VStack
        centered
        gap={5}
        style={{
          filter: `blur(${scrollValue * 1000}px)`,
          opacity: 1 - scrollValue,
        }}
      >
        <h1 className="whitespace-nowrap text-9xl font-black">
          <Popup scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
            <span className="inline-flex whitespace-nowrap">
              {"My Writings".split("").map((char, index) => (
                <FadeIn
                  key={index}
                  delayBetween={0.05}
                  index={index}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </FadeIn>
              ))}
            </span>
          </Popup>
        </h1>
        <FadeIn index={2}>
          <h1 className="whitespace-nowrap text-6xl font-extrabold tracking-tight text-foreground/40">
            {`Penny for my thoughts anyone?...`}
          </h1>
        </FadeIn>
      </VStack>
      <BouncingArrow />
    </VStack>
  );
}
