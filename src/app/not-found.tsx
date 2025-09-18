import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import GlitchText from "../components/Glitch Effects/GlitchText";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-6 px-4 text-center">
        <h2 className="text-2xl text-text">Whoops! Page Not Found</h2>
        <h1 className="text-6xl font-bold">
          <GlitchText ttr={400}>4</GlitchText>
          <GlitchText ttr={700}>0</GlitchText>
          <GlitchText ttr={500}>4</GlitchText>
        </h1>
        <p className="mx-auto max-w-md text-text/80">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-3 rounded-lg bg-primary px-4 py-3 text-background transition-colors hover:bg-primary/90"
        >
          <ArrowLeft className="h-4 w-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
