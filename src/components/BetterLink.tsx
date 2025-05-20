import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { goTo } from "./PageBlur";
import { usePreferences } from "./providers/Preferences-Provider";

type BetterLinkProps = {
  href: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

const BetterLink = forwardRef<HTMLDivElement, BetterLinkProps>(
  ({ href, children, ...props }, ref) => {
    const { applyRandomTheme } = usePreferences();
    const router = useRouter();

    return (
      <div
        ref={ref}
        onClick={() => {
          applyRandomTheme();
          goTo(router, href);
        }}
        className="cursor-pointer hover:underline"
        {...props}
      >
        {children}
      </div>
    );
  },
);
BetterLink.displayName = "BetterLink";

export default BetterLink;
