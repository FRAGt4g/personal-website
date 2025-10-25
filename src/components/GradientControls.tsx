interface GradientControlsProps {
  radius: number;
  blur: number;
  onRadiusChange: (radius: number) => void;
  onBlurChange: (blur: number) => void;
}

export default function GradientControls({
  radius,
  blur,
  onRadiusChange,
  onBlurChange,
}: GradientControlsProps) {
  return (
    <div className="mb-8 w-full max-w-md space-y-6">
      {/* Radius Control */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Gradient Radius: {radius}px
        </label>
        <input
          type="range"
          min="50"
          max="800"
          value={radius}
          onChange={(e) => onRadiusChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>50px</span>
          <span>800px</span>
        </div>
      </div>

      {/* Blur Control */}
      <div>
        <label className="mb-2 block text-sm font-medium text-foreground">
          Blur Intensity: {blur}rem
        </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={blur}
          onChange={(e) => onBlurChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>0rem</span>
          <span>10rem</span>
        </div>
      </div>
    </div>
  );
}
