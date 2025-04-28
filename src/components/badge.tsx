import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  style: {
    backgroundColor: string;
    color: string;
  };
  className?: ClassValue;
}

const Badge = ({ children, style, className }: BadgeProps) => {
  return (
    <div
      style={style}
      className={cn(
        "flex items-center justify-center px-6 py-1 rounded-full w-fit",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Badge;
