import Link from "next/link";
import { FaEnvelope, FaFileAlt, FaGithub, FaLinkedin } from "react-icons/fa";
import Container from "../Container";
import { HStack } from "../HelperDivs";
import Popup from "../Popup";

type Social = {
  icon: React.ElementType;
  link: string;
  download: boolean;
};

const socials: Record<string, Social> = {
  github: {
    icon: FaGithub,
    link: "https://github.com/FRAGt4g",
    download: false,
  },
  linkedin: {
    icon: FaLinkedin,
    link: "https://www.linkedin.com/in/miles-fritzmather/",
    download: false,
  },
  email: {
    icon: FaEnvelope,
    link: "mailto:miles.fritzmather@gmail.com",
    download: false,
  },
  // discord: {
  //   icon: FaDiscord,
  //   link: "https://discord.com/users/FRAGt4g",
  //   download: false,
  // },
  resume: {
    icon: FaFileAlt,
    link: "/Miles Fritzmather Resume.pdf",
    download: true,
  },
};

export const AllSocials = ({
  ignore = [],
}: {
  ignore?: (keyof typeof socials)[];
}) => {
  return (
    <HStack className="text-4xl text-primary/50">
      {Object.entries(socials)
        .filter(([key]) => !ignore.includes(key))
        .map(([key, info], index) => (
          <Popup key={key} scaleIncrease={1.3} pullForce={1 / 5} shrinkOnClick>
            <Container
              className="rounded-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                download={info.download}
              >
                <info.icon size={40} />
              </Link>
            </Container>
          </Popup>
        ))}
    </HStack>
  );
};

export default socials;
