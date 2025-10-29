import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Container from "~/components/Container";
import { VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";
import { FadeIn } from "../components/fade-in";

const HeroBanner = () => {
  return (
    <VStack centered gap={20} className="h-[100vh] w-full">
      <VStack centered gap={5}>
        <h1 className="whitespace-nowrap text-9xl font-black">
          <Popup scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
            <span className="inline-flex whitespace-nowrap">
              {"Page Not Found".split("").map((char, index) => (
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
            {`Oops! You are in the wrong place...`}
          </h1>
        </FadeIn>
      </VStack>
      <Popup scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
        <Container>
          <Link
            href="/"
            className="inline-flex items-center gap-7 px-4 py-3 text-3xl font-black"
          >
            <ArrowLeft className="size-8" />
            Get out of here...
          </Link>
        </Container>
      </Popup>
    </VStack>
  );
};

export default function NotFound() {
  return (
    <VStack ySpacing="top" xSpacing="center" className="w-full">
      <HeroBanner />
    </VStack>
  );
}
