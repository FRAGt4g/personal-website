import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import PageBlur from "~/components/PageBlur";
import { PreferencesProvider } from "~/components/providers/Preferences-Provider";
import ThemeHint from "~/components/ThemeHint";
import { env } from "~/env";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Miles Fritzmather",
  description: "Miles Fritzmather's personal website",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body style={{ fontFamily: "var(--theme-font-sans)" }}>
        <PreferencesProvider>
          {/* <CircleMouse /> */}
          <PageBlur />
          <Navbar />
          <main className="mx-auto flex min-h-safe-area max-w-screen-2xl flex-col">
            <div className="flex-1">{children}</div>
          </main>
          {env.NODE_ENV === "development" && (
            <ThemeHint corner="bottom-right" />
          )}
          {/* <SettingsButton corner="top-right" /> */}
        </PreferencesProvider>
      </body>
    </html>
  );
}
