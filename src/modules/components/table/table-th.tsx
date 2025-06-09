import { ReactNode, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  children: ReactNode;
}

const TableTh = ({ children, ...props }: TableThProps) => (
  <th
    {...props}
    className={cn(
      "px-6 py-4 font-medium text-gray-900 whitespace-nowrap",
      props.className || ""
    )}
  >
    {children}
  </th>
);

export { TableTh };
