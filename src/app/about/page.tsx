import { AllSocials } from "~/components/basics/socials";
import Container from "~/components/Container";
import { FadeInText } from "~/components/fade-in";
import { VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <VStack y="top" x="center" className="w-full">
      <HeroBanner />
    </VStack>
  );
}

const HeroBanner = () => {
  return (
    <VStack centered gap={20} className="h-[100vh] w-full">
      <VStack centered gap={5}>
        <h1
          className={cn(
            "text-6xl font-extrabold tracking-tight text-foreground/40",
          )}
        >
          {`What's up! I'm`}
        </h1>
        <h1 className="whitespace-nowrap text-9xl font-black">
          <Popup scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
            <span className="inline-flex whitespace-nowrap">
              <FadeInText text="Miles Fritzmather" delayBetween={0.05} />
            </span>
          </Popup>
        </h1>
      </VStack>
      <Container
        className="max-w-[1000px]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <p className="text-center text-2xl">
          I&apos;m a student at the&nbsp;
          <span className="font-black italic">
            University of Texas at Austin
          </span>
          &nbsp;studying Computer Science and Mathematics. I&apos;m interested
          in software development, machine learning, and making cool stuff. Take
          a look around and see what I&apos;ve been up to!
        </p>
      </Container>
      <AllSocials />
      {/* <BouncingArrow /> */}
    </VStack>
  );
};

// const AboutMe = () => {
//   return (
//     <VStack
//       centered
//       gap={5}
//       className="h-[400px] w-[100vw] bg-background p-10 shadow-lg shadow-black/30"
//     >
//       <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
//         About Me
//       </h1>
//       <p className="text-2xl">
//         I&apos;m a student at the University of Texas at Austin studying
//         Computer Science and Mathematics. I&apos;m interested in software
//         development, machine learning, and making cool stuff.
//       </p>
//     </VStack>
//   );
// };
