import "~/styles/globals.css";

import { type Metadata } from "next";
import { Karla } from "next/font/google";
import BackgroundNoiseEffect from "~/components/BackgroundEffects";
import CircleMouse from "~/components/CircleMouse";
import PageBlur from "~/components/PageBlur";
import { PreferencesProvider } from "~/components/providers/Preferences-Provider";
import SettingsButton from "~/components/SettingsButton";
import ThemeHint from "~/components/ThemeHint";
import { env } from "~/env";
import Navbar from "../components/Navbar";

const karla = Karla({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Miles Fritzmather",
  description: "Miles Fritzmather's personal website",
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${karla.className}`}>
        <PreferencesProvider>
          <BackgroundNoiseEffect />
          <PageBlur />
          <Navbar />
          <CircleMouse />
          <main className="max-w-content mx-auto flex flex-col">
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
