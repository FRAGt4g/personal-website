import { cn } from "~/lib/utils";

const Header = ({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      <p className="text text-lg">{description}</p>
    </div>
  );
};

export default Header;
