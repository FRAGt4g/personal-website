import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { usePreferences } from "../providers/Preferences-Provider";
import { goTo } from "./PageBlur";
import Popup from "./Popup";

type BetterLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BetterLink = forwardRef<HTMLDivElement, BetterLinkProps>(
  ({ href, children, ...props }, ref) => {
    const { applyRandomTheme } = usePreferences();
    const router = useRouter();

    return (
      <Popup shrinkOnClick>
        <div
          ref={ref}
          onClick={() => {
            applyRandomTheme();
            goTo(router, href);
          }}
          className="cursor-pointer"
          {...props}
        >
          {children}
        </div>
      </Popup>
    );
  },
);
BetterLink.displayName = "BetterLink";

export default BetterLink;
