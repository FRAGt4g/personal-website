export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="mb-8 text-4xl font-bold">About Me</h1>

      <div className="space-y-6 text-lg">
        <p>
          Hi! I'm Miles Fritzmather, a passionate developer focused on creating
          engaging web experiences. I specialize in modern web technologies and
          love building intuitive user interfaces.
        </p>

        <p>
          With expertise in React, TypeScript, and Next.js, I enjoy tackling
          complex problems and turning them into elegant solutions. I'm
          particularly interested in animation, interaction design, and
          performance optimization.
        </p>

        <p>
          When I'm not coding, you can find me exploring new technologies,
          contributing to open source projects, or sharing knowledge with the
          developer community.
        </p>

        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Node.js",
              "Tailwind CSS",
              "Framer Motion",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-primary/10 px-4 py-2 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
