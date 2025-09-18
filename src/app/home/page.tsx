"use client";

import { useState } from "react";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { RemoteRealGlitch } from "~/components/Glitch Effects/RealGlitch";
import GradientText from "~/components/GradientText";
import { HStack, VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";

export default function Home() {
  // const pseudoRandom = (i: number) => (Math.abs(Math.sin(i * 9999)) % 1) + 0.5; // value in [0.5,1.5)
  const [trigger] = useState(false);
  return (
    <div className="flex h-safe-area flex-col">
      <VStack className="ml-10 mt-24" ySpacing="top" xSpacing="center">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {`What's up! I'm`}
        </h1>
        {/* <h1 className="h-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <GlitchText ttr={300}>Miles Fritzmather</GlitchText>
        </h1> */}
        <h1 className="h-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <Popup scaleIncrease={1.2} pullForce={1 / 10}>
            <RemoteRealGlitch
              trigger={trigger}
              shouldResetStyle
              tickSpeedRange={[100, 200]}
            >
              Miles Fritzmather
            </RemoteRealGlitch>
          </Popup>
        </h1>
        <p className="mt-20 w-[60%] rounded-lg border-2 border-accent/30 bg-accent/30 p-3 text-center text-2xl transition-all duration-300 hover:shadow-lg">
          I&apos;m a student at the
          <GradientText className="font-bold">
            University of Texas at Austin
          </GradientText>
          studying Computer Science and Mathematics. I&apos;m interested in
          software development, machine learning, and artificial intelligence.
        </p>
        <HStack className="text-4xl text-primary">
          <Popup addShadow>
            <FaGithub size={40} />
          </Popup>
          <Popup addShadow>
            <FaLinkedin size={40} />
          </Popup>
          <Popup addShadow>
            <FaEnvelope size={40} />
          </Popup>
        </HStack>
      </VStack>
    </div>
  );
}
