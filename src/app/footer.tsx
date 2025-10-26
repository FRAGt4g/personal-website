import Link from "next/link";
import socials from "~/components/basics/socials";
import { HStack } from "~/components/HelperDivs";

const Footer = () => {
  return (
    <footer className="mt-5 flex w-[100vw] flex-col p-4 shadow-xl shadow-white">
      <HStack centered className="w-full">
        <p className="text-sm text-gray-500">Miles Fritzmather</p>
        <HStack className="text-4xl text-primary/50">
          {Object.entries(socials).map(([key, info]) => (
            <Link
              key={key}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <info.icon size={20} />
            </Link>
          ))}
        </HStack>
      </HStack>
    </footer>
  );
};

export default Footer;
