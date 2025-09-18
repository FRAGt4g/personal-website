"use client";

import Header from "~/components/basics/header";
import { TextReveal } from "~/components/basics/reveal";
import { HStack, VStack } from "~/components/HelperDivs";
import { Separator } from "~/components/Shadcn/separator";

const ProjectsPage = () => {
  return (
    <VStack className="mx-auto max-w-4xl px-4 py-16">
      <Header
        title="Projects"
        description="Look at all the cool stuff im working on!"
      />

      <Separator className="mb-8" />

      <HStack>
        <TextReveal animationTime={1000} n={2}>
          Companies
        </TextReveal>
        <TextReveal animationTime={1000} n={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </TextReveal>
      </HStack>
    </VStack>
  );
};

export default ProjectsPage;
