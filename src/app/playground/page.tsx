"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Separator } from "~/components/Shadcn/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/components/Shadcn/tabs";
import { cn } from "~/lib/utils";
import AllThemes from "./pages/allthemes";

export default function SandboxPage() {
  const router = useRouter();
  const tabs: Record<string, React.ReactNode> = {
    "All Themes": <AllThemes />,
  };

  const searchParams = useSearchParams();
  const tab = searchParams.get("tab")
    ? decodeURIComponent(searchParams.get("tab")!)
    : Object.keys(tabs)[0]!;

  const [selectedTab, setSelectedTab] = useState<string>(tab);

  if (Object.keys(tabs).length === 0) {
    return (
      <div className="mx-auto my-auto flex w-fit flex-col gap-4 rounded-md border-2 border-gray-300 bg-foreground/10 p-4 shadow-md shadow-black/30">
        <h1 className="text-center text-4xl font-bold">
          {
            "🔍 Looks like you haven't made anything interesting to test yet... 🔍"
          }
        </h1>
      </div>
    );
  }

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="mx-auto flex w-full flex-col gap-4 rounded-md border-2 border-gray-300 p-4">
        {children}
      </div>
    );
  };

  return (
    <div className="mx-auto mt-20 flex w-[75vw] flex-col gap-4 p-4">
      <h1 className="text-center text-4xl font-bold">
        Welcome to the Sandbox!
      </h1>
      <Separator orientation="horizontal" />
      {Object.keys(tabs).length > 1 ? (
        <Tabs value={selectedTab}>
          <TabsList
            className={cn(
              "mx-auto grid w-full",
              Object.keys(tabs).length == 2 && "grid-cols-2",
              Object.keys(tabs).length == 3 && "grid-cols-3",
              Object.keys(tabs).length == 4 && "grid-cols-4",
              Object.keys(tabs).length == 5 && "grid-cols-5",
              Object.keys(tabs).length == 6 && "grid-cols-6",
              Object.keys(tabs).length == 7 && "grid-cols-7",
              Object.keys(tabs).length == 8 && "grid-cols-8",
              Object.keys(tabs).length == 9 && "grid-cols-9",
              Object.keys(tabs).length == 10 && "grid-cols-10",
            )}
          >
            {Object.keys(tabs).map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                onClick={() => {
                  router.push(`/Sandbox?tab=${encodeURIComponent(tab)}`);
                  setSelectedTab(tab);
                }}
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          {Object.keys(tabs).map((tab) => (
            <TabsContent key={tab} value={tab} className="mx-auto">
              <ContentWrapper>{tabs[tab]}</ContentWrapper>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <>
          <div className="mt-5 text-2xl font-bold">{Object.keys(tabs)[0]!}</div>
          <ContentWrapper>{tabs[Object.keys(tabs)[0]!]}</ContentWrapper>
        </>
      )}
    </div>
  );
}
