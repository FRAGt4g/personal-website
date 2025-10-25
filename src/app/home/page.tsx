import { AllSocials } from "~/components/basics/socials";
import Container from "~/components/Container";
import { RemoteRealGlitch } from "~/components/Glitch Effects/RealGlitch";
import GradientText from "~/components/GradientText";
import { VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";
import BouncingArrow from "./bouncing-arrow";

export default function Home() {
  return (
    <VStack ySpacing="top" xSpacing="center" className="w-full">
      <HeroBanner />
      <AllSocials />
    </VStack>
  );
}

const HeroBanner = () => {
  return (
    <VStack centered gap={20} className="h-[100vh] w-full">
      <VStack centered gap={5}>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {`What's up! I'm`}
        </h1>
        <h1 className="h-20 text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <Popup scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
            <RemoteRealGlitch shouldResetStyle tickSpeedRange={[100, 200]}>
              Miles Fritzmather
            </RemoteRealGlitch>
          </Popup>
        </h1>
      </VStack>
      <Container className="max-w-[1000px]">
        <p className="text-center text-2xl">
          I&apos;m a student at the
          <GradientText className="font-bold">
            University of Texas at Austin
          </GradientText>
          studying Computer Science and Mathematics. I&apos;m interested in
          software development, machine learning, and making cool stuff.
        </p>
      </Container>
      <AllSocials />
      <BouncingArrow />
    </VStack>
  );
};
