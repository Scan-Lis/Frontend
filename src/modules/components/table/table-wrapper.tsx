import { cn } from "@/lib/utils";
import { ReactNode, TableHTMLAttributes } from "react";

interface TableWrapperProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const Table = ({ children, ...props }: TableWrapperProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table
        {...props}
        className={cn(
          "w-full text-sm text-left rtl:text-right text-gray-500",
          props.className || ""
        )}
      >
        {children}
      </table>
    </div>
  );
};

export default Table;
