import { useEffect, useRef, useState } from "react";
import { cn } from "~/lib/utils";
import { GlitchTextWithExternalTimer } from "./GlitchText";

type RealGlitchProps = {
  children: string;
  className?: string;
  tickSpeedRange?: [number, number];
  shouldResetStyle?: boolean;
} & { triggerOnHover?: boolean };

function determinsiticRandom(i: number) {
  return Math.abs(Math.sin(i * 8536.317)) % 1; // value in [0,1)
}

export function RemoteRealGlitch({
  children,
  className,
  tickSpeedRange = [100, 200],
  trigger,
  shouldResetStyle = true,
}: RealGlitchProps & { trigger: boolean }) {
  const timerRef = useRef(0);
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);
  const timerInterval = 100;

  useEffect(() => {
    console.log("REAL GLITCH RENDER");
  }, []);

  useEffect(() => {
    if (trigger) {
      console.log("start");
      timerRef.current = 0;
      intervalId.current = setInterval(() => {
        timerRef.current = timerRef.current + timerInterval;
      }, timerInterval);
    } else {
      console.log("stop");
      clearInterval(intervalId.current);
      intervalId.current = undefined;
      timerRef.current = -1;
    }
  }, [trigger]);

  return (
    <div className={cn("h-10", className)}>
      {children.split(" ").map((word, index) => (
        <span key={index}>
          <div key={index} className="inline-block">
            {Array.from(word).map((letter, index) => (
              <GlitchTextWithExternalTimer
                key={index}
                tickDelay={
                  determinsiticRandom(index) * tickSpeedRange[0] +
                  tickSpeedRange[1]
                }
                timer={timerRef.current}
                className={cn(className, "inline-block")}
                shouldResetStyle={shouldResetStyle}
              >
                {letter}
              </GlitchTextWithExternalTimer>
            ))}
          </div>{" "}
        </span>
      ))}
    </div>
  );
}

export default function RealGlitch({
  children,
  className,
  tickSpeedRange = [100, 200],
}: RealGlitchProps) {
  const [trigger, setTrigger] = useState(false);
  const [timer, setTimer] = useState(0);
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);
  const timerInterval = 100;

  useEffect(() => {
    if (trigger) {
      console.log("start");
      setTimer(0);
      intervalId.current = setInterval(() => {
        setTimer((prev) => prev + timerInterval);
      }, timerInterval);
    } else {
      console.log("stop");
      clearInterval(intervalId.current);
      intervalId.current = undefined;
      setTimer(-1);
    }
  }, [trigger]);

  function Character({ letter, index }: { letter: string; index: number }) {
    return (
      <GlitchTextWithExternalTimer
        key={index}
        tickDelay={
          determinsiticRandom(index) * tickSpeedRange[0] + tickSpeedRange[1]
        }
        timer={timer}
        className={cn(className, "inline-block")}
      >
        {letter}
      </GlitchTextWithExternalTimer>
    );
  }

  return (
    <div
      className={cn("h-10", className)}
      onMouseEnter={() => setTrigger(true)}
      onMouseLeave={() => setTrigger(false)}
    >
      {children.split(" ").map((word, index) => (
        <span key={index}>
          <div key={index} className="inline-block">
            {Array.from(word).map((letter, index) => (
              <Character key={index} letter={letter} index={index} />
            ))}
          </div>{" "}
        </span>
      ))}
    </div>
  );
}
