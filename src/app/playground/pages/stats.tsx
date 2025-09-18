import { useState } from "react";
import { VStack } from "~/components/HelperDivs";
import { usePreferences } from "~/components/providers/Preferences-Provider";
import { type Theme } from "~/styles/Themes";

const StatisticalAnalysis = () => {
  const SAMPLE_SIZE = 1000000;
  const [results, setResults] = useState<string[]>([]);
  const { getRandomTheme } = usePreferences();

  function test() {
    const tempResults: Theme[] = [];
    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const theme = getRandomTheme(true);
      tempResults.push(theme);
    }
    setResults(tempResults);
  }

  function test2() {
    const tempResults: Theme[] = [];
    for (let i = 0; i < SAMPLE_SIZE; i++) {
      const theme = getRandomTheme(false);
      tempResults.push(theme);
    }
    setResults(tempResults);
  }

  return (
    <VStack>
      <h1>Statistical Analysis</h1>
      <button onClick={test}>Test New Randomness</button>
      <button onClick={test2}>Test Randomness</button>
      {Object.entries(
        results.reduce(
          (acc, result) => {
            acc[result] = (acc[result] ?? 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        ),
      ).map(([key, value]) => (
        <div key={key}>
          {key}: {value} | {((value / results.length) * 100).toFixed(2)}%
        </div>
      ))}
    </VStack>
  );
};

export default StatisticalAnalysis;
