import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import PageBlur from "~/components/PageBlur";
import { PreferencesProvider } from "~/components/providers/Preferences-Provider";
import SettingsButton from "~/components/SettingsButton";
import ThemeHint from "~/components/ThemeHint";
import { env } from "~/env";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "NEW UNTITLED PROJECT",
  description: "NEW UNTITLED PROJECT",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`bg-background text-text ${GeistSans.variable}`}>
      <body>
        <PreferencesProvider>
          <PageBlur />
          <Navbar />
          <main className="flex min-h-safe-area flex-col">
            <div className="flex-1">{children}</div>
          </main>
          {env.NODE_ENV === "development" && (
            <ThemeHint corner="bottom-right" />
          )}
          <SettingsButton corner="top-right" />
        </PreferencesProvider>
      </body>
    </html>
  );
}
