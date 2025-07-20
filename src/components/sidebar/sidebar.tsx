import { cn } from "@/lib/utils";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars4Icon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { RolesDB } from "@/types/types";
import { useRouter } from "next/router";
import { RoutesSidebar } from "./sidebar-routes";

interface SidebarProps {
  role: RolesDB;
}

const Sidebar = ({ role }: SidebarProps) => {
  const [isClose, setIsClose] = useState<boolean>(false);
  const router = useRouter();

  const classes = {
    navbar: cn(
      "flex-1 w-[15rem] py-8 px-4 rounded-lg text-white bg-dark-blue flex flex-col justify-between transition-all",
      { "w-10 px-0": isClose }
    ),
    button: cn(
      "flex gap-2 items-center px-4 py-3 bg-transparent hover:bg-light-blue/35 text-white rounded-lg",
      {
        "py-3 px-2 mx-auto justify-center hover:bg-light-blue/40 transition-all":
          isClose,
      }
    ),
    buttonClose: cn(
      "flex gap-2 items-center px-4 py-3 bg-light-blue text-ultra-dark-blue font-semibold rounded-lg hover:bg-light-blue/35 hover:text-white transition-all",
      {
        "py-2 px-2 mx-auto justify-center bg-transparent text-white hover:bg-light-blue/40 transition-all":
          isClose,
      }
    ),
    labelItem: cn({ hidden: isClose }),
    logo: cn("flex gap-4 items-center", { hidden: isClose }, "transition-all"),
  };

  return (
    <nav className="flex flex-col h-full gap-4">
      <section className="flex gap-4 items-center">
        <button
          onClick={() => setIsClose(!isClose)}
          className="p-2 rounded-lg bg-dark-blue text-white w-fit cursor-pointer hover:bg-ultra-dark-blue transition-all"
        >
          <Bars4Icon className="w-6 h-6" />
        </button>
        <div className={classes.logo}>
          <figure className="block w-8 -mr-2">
            <img
              className="h-full w-full object-cover"
              src="/assets/logo-lis.png"
              alt=""
            />
          </figure>
          <div className="flex flex-col gap-0 font-black text-[1.3rem] text-dark-blue leading-none">
            <span className="relative after:absolute after:ml-2 after:top-1/2 after:translate-y-1/2 after:w-4/5 after:rounded-lg after:h-1 after:bg-dark-blue">
              Scan
            </span>
            <span>Lis</span>
          </div>
        </div>
      </section>
      <ul className={classes.navbar}>
        <div className="flex flex-col gap-4 text-light-blue">
          {RoutesSidebar[role].map(({ href, icon, label }) => (
            <Link
              key={href}
              className={cn(classes.button, {
                "bg-light-blue/35": href === router.pathname,
              })}
              href={href}
            >
              {icon}
              <span className={classes.labelItem}>{label}</span>
            </Link>
          ))}
        </div>
        <button
          className={classes.buttonClose}
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <span className={classes.labelItem}>Salir</span>
          <ArrowLeftEndOnRectangleIcon className="w-4 h-4 rotate-180" />
        </button>
      </ul>
    </nav>
  );
};

export default Sidebar;
