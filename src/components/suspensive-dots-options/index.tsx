import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import { SuspensiveDotsItems } from "@/types/types";

interface SuspensiveDotsOptionsProps {
  items: SuspensiveDotsItems[];
}

const SuspensiveDotsOptions = ({ items }: SuspensiveDotsOptionsProps) => {
  return (
    <section>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisHorizontalIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {items.map((item) => (
            <DropdownMenuItem key={item.title}>
              <button
                className="flex items-center gap-2 w-full cursor-pointer"
                onClick={item.onClick}
              >
                {item.icon}
                <p>{item.title}</p>
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export { SuspensiveDotsOptions };
