import { ReactNode, TdHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableTd = ({ children, ...props }: TableTdProps) => (
  <td {...props} className={cn("px-6 py-4", props.className || "")}>
    {children}
  </td>
);

export { TableTd };
