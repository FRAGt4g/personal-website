"use client";

import { motion } from "framer-motion";
import Header from "~/components/basics/header";
import { HStack, VStack } from "~/components/HelperDivs";
import Popup from "~/components/Popup";
import { Separator } from "~/components/Shadcn/separator";

const projects = [
  {
    title: "Accutime",
    description: "An app to track your time and productivity.",
    link: "https://accutime.org",
  },
  {
    title: "Longhorn Developers",
    description: "An app to track your time and productivity.",
    link: "https://example.com/project-one",
  },
  {
    title: "Video Games",
    description: "An app to track your time and productivity.",
    link: "https://example.com/project-one",
  },
  {
    title: "Stock Bot",
    description: "An app to track your time and productivity.",
    link: "https://example.com/project-one",
  },
];

const ProjectsPage = () => {
  return (
    <VStack className="mx-auto max-w-4xl px-4 py-16">
      <Header
        title="Projects"
        description="Look at all the cool stuff im working on!"
      />

      <Separator className="mb-8" />

      <VStack>
        {projects.map((project, index) => (
          <Popup key={index} scaleIncrease={1.1} pullForce={0.1}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <HStack
                rel="noopener noreferrer"
                className="w-full justify-between rounded-lg border border-gray-200 bg-primary/15 p-4 text-accent transition-shadow hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-foreground">{project.description}</p>
              </HStack>
            </motion.div>
          </Popup>
        ))}
      </VStack>
    </VStack>
  );
};

export default ProjectsPage;
