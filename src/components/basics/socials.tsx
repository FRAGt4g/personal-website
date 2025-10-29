import Link from "next/link";
import {
  FaDiscord,
  FaEnvelope,
  FaFileAlt,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
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
  discord: {
    icon: FaDiscord,
    link: "https://discord.com/users/FRAGt4g",
  },
  resume: {
    icon: FaFileAlt,
    link: "/Miles_Fritzmather_Resume.pdf",
  },
} as const;

export const AllSocials = ({
  ignore = [],
}: {
  ignore?: (keyof typeof socials)[];
}) => {
  return (
    <HStack className="text-4xl text-primary/50">
      {Object.entries(socials)
        .filter(([key]) => !ignore.includes(key as keyof typeof socials))
        .map(([key, info], index) => (
          <Popup key={key} scaleIncrease={1.2} pullForce={1 / 10} shrinkOnClick>
            <Container
              className="rounded-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
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
