"use client";

import Container from "~/components/Container";
import { VStack } from "~/components/HelperDivs";
import Toggle from "~/components/Toggle";

export default function ToggleTestPage() {
  return (
    <VStack
      className="relative z-10 mx-auto mt-20 max-w-4xl"
      ySpacing="top"
      xSpacing="center"
      gap={8}
    >
      {/* Interactive Demo */}
      <div className="mt-8 w-full">
        <h2 className="mb-6 text-center text-2xl font-semibold text-foreground">
          Interactive Demo
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <Container>
            <p>Hello World!</p>
          </Container>
          <Toggle
            onClass="switch-light"
            offClass="off-light"
            label="Light Toggle"
            initialOff={false}
          />
          <Toggle
            onClass="switch-light"
            offClass="off-red-light"
            label="Light Red Toggle"
            initialOff={true}
          />
          <Toggle
            onClass="switch-dark"
            offClass="off-dark"
            label="Dark Toggle"
            initialOff={false}
          />
          <Toggle
            onClass="switch-dark"
            offClass="off-red-dark"
            label="Dark Red Toggle"
            initialOff={true}
          />
        </div>
      </div>
    </VStack>
  );
}
