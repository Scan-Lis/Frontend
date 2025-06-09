import { cn } from "@/lib/utils";
import { ReactNode, HTMLAttributes } from "react";

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  children: ReactNode;
}

const TableBody = ({ children, ...props }: TableBodyProps) => {
  return (
    <tbody {...props} className={cn(props.className || "")}>
      {children}
    </tbody>
  );
};

export { TableBody };
