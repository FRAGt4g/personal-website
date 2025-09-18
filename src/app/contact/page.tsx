"use client";

import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import BetterLink from "~/components/BetterLink";
import { HStack, VStack } from "~/components/HelperDivs";

const ContactMe = () => {
  return (
    <div className="flex h-safe-area flex-col">
      <VStack className="mt-24" ySpacing="top">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Like what you see? Shoot me a message!
        </h1>
        <HStack gap={4}>
          {/* Hovering over the envelope icon will show the email address */}
          {/* <Link href="mailto:milesfritzmather@gmail.com">
            <HStack
              ySpacing="middle"
              xSpacing="left"
              className="w-[40px] overflow-hidden rounded-lg border-2 border-accent/30 bg-accent/30 p-3 text-2xl transition-all duration-300 hover:w-min hover:shadow-lg"
            >
              <FaEnvelope size={40} />
              milesfritzmather@gmail.com
            </HStack>
          </Link> */}
          <BetterLink href="mailto:milesfritzmather@gmail.com">
            <HStack
              centered
              className="w-min rounded-lg border-2 border-accent/30 bg-accent/30 p-3 text-2xl backdrop-blur-md transition-all duration-300 hover:shadow-lg"
            >
              <FaEnvelope size={40} />
              milesfritzmather@gmail.com
            </HStack>
          </BetterLink>
          <BetterLink href="https://github.com/FRAGt4g">
            <HStack
              centered
              className="w-min rounded-lg border-2 border-accent/30 bg-accent/30 p-3 text-2xl backdrop-blur-md transition-all duration-300 hover:shadow-lg"
            >
              <FaGithub size={40} />
              FRAGt4g
            </HStack>
          </BetterLink>
          <BetterLink href="https://www.linkedin.com/in/miles-fritzmather/">
            <HStack
              centered
              className="rounded-lg border-2 border-accent/30 bg-accent/30 p-3 text-2xl backdrop-blur-md transition-all duration-300 hover:shadow-lg"
            >
              <FaLinkedin size={40} />
              Miles Fritzmather
            </HStack>
          </BetterLink>
        </HStack>
      </VStack>
    </div>
  );
};

export default ContactMe;
