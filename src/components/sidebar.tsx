import { cn } from "@/utils/classnames";
import {
  ArrowLeftEndOnRectangleIcon,
  Bars4Icon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useState } from "react";

const Sidebar = () => {
  const [isClose, setIsClose] = useState<boolean>(false);

  const classes = {
    navbar: cn(
      "flex-1 w-[15rem] py-8 px-4 rounded-lg text-white bg-dark-blue flex flex-col justify-between transition-all",
      { "w-10 px-0": isClose }
    ),
    button: cn(
      "flex gap-2 items-center px-4 py-3 bg-light-blue text-white rounded-lg",
      {
        "bg-transparent p-0 justify-center my-3 hover:bg-light-blue hover:opacity-9 transition-all":
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
          className="p-2 rounded-lg bg-dark-blue text-white w-fit cursor-pointer hover:bg-ultra-dark-blue transition-all">
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
          <Link className={classes.button} href={""}>
            <ComputerDesktopIcon className="w-4 h-4" />
            <span className={classes.labelItem}>Panel de estado</span>
          </Link>
          <Link className={classes.button} href={""}>
            <DocumentTextIcon className="w-4 h-4" />
            <span className={classes.labelItem}>Reportes</span>
          </Link>
          <Link className={classes.button} href={""}>
            <ExclamationTriangleIcon className="w-4 h-4" />
            <span className={classes.labelItem}>Problemas</span>
          </Link>
        </div>
        <Link
          className="flex gap-2 items-center px-4 py-3 bg-light-blue text-ultra-dark-blue rounded-lg"
          href={""}>
          <span className={classes.labelItem}>Salir</span>
          <ArrowLeftEndOnRectangleIcon className="w-4 h-4 rotate-180" />
        </Link>
      </ul>
    </nav>
  );
};

export default Sidebar;