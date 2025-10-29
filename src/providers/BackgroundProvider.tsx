"use client";

import {
  createContext,
  createRef,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { clamp } from "~/lib/utils";

export type Force = {
  x: number;
  y: number;
};

type XY = { x: number; y: number };

export type Blob = {
  position: XY;
  velocity: XY;
  ref: RefObject<HTMLDivElement>;
} & BlobConfig;

export type BlobConfig = {
  solidRadius: number;
  glowRadius: number;
  color: string;
};
export type BackgroundContext = {
  blobs: Blob[];
  mouseBlob: RefObject<HTMLDivElement>;
  assignMouseBlob: (el: HTMLDivElement) => void;
  addBlob: (blob: Blob) => void;
  spawnRandomBlob: () => void;
  spawnRandomBlobWithPosition: (position: XY) => void;
  addForce: (force: Force) => void;
  isMounted: boolean;
};

// const BlobConfigs = [
//   {
//     size: 500,
//     color: "255, 100, 255",
//   },
// ] satisfies BlobConfig[];

const BackgroundProviderContext = createContext<BackgroundContext>({
  blobs: [],
  mouseBlob: createRef<HTMLDivElement>(),
  assignMouseBlob: () => null,
  addBlob: () => null,
  spawnRandomBlob: () => null,
  spawnRandomBlobWithPosition: () => null,
  addForce: () => null,
  isMounted: false,
});

export function BackgroundProvider(props: { children: React.ReactNode }) {
  const mouseBlob = useRef<HTMLDivElement>(null);
  const mouseBubbleLerpSpeed = 20;

  // Keep mouse blob position in ref to persist across rerenders
  const mouseBlobPosRef = useRef({
    current: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
  });

  // Keep blobs in state for component updates
  const [blobs, setBlobs] = useState<Blob[]>([
    {
      solidRadius: 100,
      glowRadius: 300,
      color: "255, 100, 255",
      velocity: { x: 30, y: 300 },
      position: { x: 100, y: 500 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 200,
      glowRadius: 400,
      color: "0, 100, 100",
      velocity: { x: 500, y: 300 },
      position: { x: 800, y: 800 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 150,
      glowRadius: 350,
      color: "255, 120, 60",
      velocity: { x: -200, y: 180 },
      position: { x: 600, y: 400 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 250,
      glowRadius: 500,
      color: "80, 200, 255",
      velocity: { x: 120, y: -250 },
      position: { x: 1200, y: 700 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 180,
      glowRadius: 320,
      color: "200, 80, 255",
      velocity: { x: -150, y: -100 },
      position: { x: 400, y: 300 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 300,
      glowRadius: 600,
      color: "255, 255, 120",
      velocity: { x: 60, y: 220 },
      position: { x: 1600, y: 500 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 120,
      glowRadius: 280,
      color: "100, 255, 180",
      velocity: { x: -80, y: 260 },
      position: { x: 900, y: 200 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 100,
      glowRadius: 300,
      color: "100, 100, 255",
      velocity: { x: -300, y: 10 },
      position: { x: 740, y: 500 },
      ref: createRef<HTMLDivElement>(),
    },
    {
      solidRadius: 100,
      glowRadius: 300,
      color: "255, 100, 100",
      velocity: { x: 200, y: -190 },
      position: { x: 1400, y: 500 },
      ref: createRef<HTMLDivElement>(),
    },
  ]);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addBlob = useCallback((blob: Blob) => {
    setBlobs((prev) => [...prev, blob]);
  }, []);

  const addForce = useCallback(
    (force: Force) => {
      blobs.forEach((blob) => {
        blob.velocity.x += force.x;
        blob.velocity.y += force.y;
      });
    },
    [blobs],
  );

  useEffect(() => {
    // Set up mouse blob animation (only once)
    const mouseBlobPos = mouseBlobPosRef.current;

    function moveMouseBlob() {
      mouseBlobPos.current.x +=
        (mouseBlobPos.target.x - mouseBlobPos.current.x) / mouseBubbleLerpSpeed;
      mouseBlobPos.current.y +=
        (mouseBlobPos.target.y - mouseBlobPos.current.y) / mouseBubbleLerpSpeed;

      if (mouseBlob.current) {
        mouseBlob.current.style.transform = `translate(${Math.round(mouseBlobPos.current.x - mouseBlob.current.getBoundingClientRect().width / 2)}px, ${Math.round(mouseBlobPos.current.y - mouseBlob.current.getBoundingClientRect().height / 2)}px)`;
      }
      requestAnimationFrame(() => {
        moveMouseBlob();
      });
    }

    function handleMouseMove(event: MouseEvent) {
      mouseBlobPos.target.x = event.clientX;
      mouseBlobPos.target.y = event.clientY;
    }

    window.addEventListener("mousemove", handleMouseMove);
    moveMouseBlob();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseBubbleLerpSpeed]);

  useEffect(() => {
    // Set up blob animations (runs when blobs change)
    let lastTime = Date.now();

    function keepInBounds(blob: Blob) {
      if (blob.position.x < 0 || blob.position.x > window.innerWidth) {
        blob.velocity.x = -blob.velocity.x;
      }
      if (blob.position.y < 0 || blob.position.y > window.innerHeight) {
        blob.velocity.y = -blob.velocity.y;
      }

      blob.position.x = clamp(blob.position.x, {
        min: 0,
        max: window.innerWidth,
      });
      blob.position.y = clamp(blob.position.y, {
        min: 0,
        max: window.innerHeight,
      });
    }

    function bounceOffOthers(blob: Blob) {
      blobs.forEach((otherBlob) => {
        if (otherBlob === blob) return;
        const distance = Math.sqrt(
          (blob.position.x - otherBlob.position.x) ** 2 +
            (blob.position.y - otherBlob.position.y) ** 2,
        );
        if (distance < 10) {
          console.log("bouncing off other blob");
          const angle = Math.atan2(
            otherBlob.position.y - blob.position.y,
            otherBlob.position.x - blob.position.x,
          );
          blob.velocity.x += Math.cos(angle) * otherBlob.velocity.x;
          blob.velocity.y += Math.sin(angle) * otherBlob.velocity.y;
          otherBlob.velocity.x += Math.cos(angle) * blob.velocity.x;
          otherBlob.velocity.y += Math.sin(angle) * blob.velocity.y;
        }
      });
    }

    function updateBubbleVelocity(blob: Blob) {
      const now = Date.now();
      const deltaTime = (now - lastTime) / 1000; // Convert to seconds
      const maxVelocity = 4;
      const acceleration = 20;

      // Gradually change velocity with smooth randomness
      blob.velocity.x += (Math.random() - 0.5) * acceleration * deltaTime;
      blob.velocity.y += (Math.random() - 0.5) * acceleration * deltaTime;

      // Clamp velocity to prevent too fast movement
      blob.velocity.x = Math.max(
        -maxVelocity,
        Math.min(maxVelocity, blob.velocity.x),
      );
      blob.velocity.y = Math.max(
        -maxVelocity,
        Math.min(maxVelocity, blob.velocity.y),
      );

      lastTime = now;
    }

    function moveMovableBlob(blob: Blob, index: number) {
      // Update velocity over time
      updateBubbleVelocity(blob);

      // Update position based on velocity
      blob.position.x += blob.velocity.x;
      blob.position.y += blob.velocity.y;

      keepInBounds(blob);
      bounceOffOthers(blob);

      if (blob.ref.current) {
        const rect = blob.ref.current.getBoundingClientRect();
        blob.ref.current.setAttribute(
          "aria-details",
          JSON.stringify({
            x: blob.position.x,
            y: blob.position.y,
            width: rect.width,
            height: rect.height,
            solidRadius: blob.solidRadius,
            glowRadius: blob.glowRadius,
            color: blob.color,
          }),
        );
        blob.ref.current.style.transform = `translate(${blob.position.x - rect.width / 2}px, ${blob.position.y - rect.height / 2}px)`;
      }

      requestAnimationFrame(() => {
        moveMovableBlob(blob, index);
      });
    }

    // Start animations for each blob
    blobs.forEach((blob, index) => {
      moveMovableBlob(blob, index);
    });
  }, [blobs]);

  const assignMouseBlob = useCallback((el: HTMLDivElement) => {
    (mouseBlob as { current: HTMLDivElement }).current = el!;
  }, []);

  function getRandomBrightColor() {
    const vals = [
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
    ];
    vals.sort(() => Math.random() - 0.5);
    return `${vals[0]}, ${vals[1]}, ${vals[2]}`;
  }

  const spawnRandomBlobWithPosition = useCallback(
    (position: XY) => {
      const solidRadius = Math.round(Math.random() * 300) + 50;
      const glowRadius = Math.round(Math.random() * 500) + 200;
      addBlob({
        solidRadius,
        glowRadius: solidRadius + glowRadius,
        color: getRandomBrightColor(),
        velocity: { x: Math.random() * 10 - 5, y: Math.random() * 10 - 5 },
        position: position,
        ref: createRef<HTMLDivElement>(),
      });
    },
    [addBlob],
  );

  const spawnRandomBlob = useCallback(() => {
    console.log(
      "spawning random blob in range of window: ",
      window.innerWidth,
      window.innerHeight,
    );
    spawnRandomBlobWithPosition({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    });
  }, [spawnRandomBlobWithPosition]);

  const values: BackgroundContext = useMemo(
    () => ({
      blobs,
      spawnRandomBlob,
      mouseBlob,
      assignMouseBlob,
      addBlob,
      addForce,
      spawnRandomBlobWithPosition,
      isMounted,
    }),
    [
      blobs,
      assignMouseBlob,
      addBlob,
      addForce,
      isMounted,
      spawnRandomBlob,
      spawnRandomBlobWithPosition,
    ],
  );

  return (
    <BackgroundProviderContext.Provider value={values}>
      {props.children}
    </BackgroundProviderContext.Provider>
  );
}

export const useBackground = () => {
  const context = useContext(BackgroundProviderContext);
  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider");
  }
  return context;
};
