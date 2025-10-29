"use client";

import { VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";
import BouncingArrow from "../../components/bouncing-arrow";
import { FadeIn } from "../../components/fade-in";

const BlogPage = () => {
  return (
    <VStack ySpacing="top" xSpacing="center" className="w-full">
      <HeroBanner />
    </VStack>
  );
};

const HeroBanner = () => {
  return (
    <VStack centered gap={20} className="h-[100vh] w-full">
      <VStack centered gap={5}>
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
};

export default BlogPage;
