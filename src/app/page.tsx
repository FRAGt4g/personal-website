export default async function Home() {
  return (
    <>
      <div className="h-safe-area bg-background flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Based on <span className="text-tertiary">T3</span> Stack
          </h1>
          <p className="text-2xl">Now go pop your own shit</p>
        </div>
      </div>
      <div className="h-safe-area bg-background flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            More content here for scrolling
          </h1>
        </div>
      </div>
    </>
  );
}
