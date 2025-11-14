import Link from "next/link";
import { forwardRef } from "react";
import Popup from "./Popup";

type BetterLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

const BetterLink = forwardRef<HTMLAnchorElement, BetterLinkProps>(
  ({ href, children, ...props }, ref) => {
    return (
      <Popup shrinkOnClick>
        <Link ref={ref} href={href} className="cursor-pointer" {...props}>
          {children}
        </Link>
      </Popup>
    );
  },
);
BetterLink.displayName = "BetterLink";

export default BetterLink;
