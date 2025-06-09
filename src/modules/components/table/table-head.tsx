import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

const TableHead = ({ children, ...props }: TableHeadProps) => {
  return (
    <thead
      {...props}
      className={cn(
        "text-xs text-ultra-dark-blue uppercase bg-light-blue/30",
        props.className || ""
      )}
    >
      {children}
    </thead>
  );
};

export { TableHead };
