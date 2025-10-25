"use client";

import Link from "next/link";
import { FaEnvelope, FaFilePdf, FaGithub, FaLinkedin } from "react-icons/fa";
import Container from "../Container";
import { HStack } from "../HelperDivs";
import Popup from "../Popup";

const socials = {
  github: {
    icon: FaGithub,
    link: "https://github.com/FRAGt4g",
  },
  linkedin: {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/miles-fritzmather/",
  },
  email: {
    icon: FaEnvelope,
    link: "mailto:miles.fritzmather@gmail.com",
  },
  resume: {
    icon: FaFilePdf,
    link: "/Miles_Fritzmather_Resume.pdf",
  },
};

export const AllSocials = () => {
  return (
    <HStack className="text-4xl text-primary/50">
      {Object.entries(socials).map(([key, info]) => (
        <Popup key={key} scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
          <Container className="rounded-full">
            <Link href={info.link} target="_blank" rel="noopener noreferrer">
              <info.icon size={40} />
            </Link>
          </Container>
        </Popup>
      ))}
    </HStack>
  );
};

export default socials;
