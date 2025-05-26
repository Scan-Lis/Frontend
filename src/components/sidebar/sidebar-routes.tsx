import { RolesDB } from "@/types/types";
import {
  ComputerDesktopIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  UserIcon,
} from "@heroicons/react/20/solid";

const RoutesSidebar = {
  [RolesDB.ROLE_ADMIN]: [
    {
      icon: <ComputerDesktopIcon className="w-4 h-4" />,
      label: "Panel de estado",
      href: "/dashboard/status-panel",
    },
    {
      icon: <DocumentTextIcon className="w-4 h-4" />,
      label: "Reportes",
      href: "/dashboard/reports",
    },
    {
      icon: <ExclamationTriangleIcon className="w-4 h-4" />,
      label: "Problemas",
      href: "/dashboard/problems",
    },
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: "Gestionar usuarios",
      href: "/dashboard/users",
    },
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: "Gestionar usuarios",
      href: "/dashboard/users",
    },
  ],
  [RolesDB.ROLE_AUXILIAR]: [
    {
      icon: <ComputerDesktopIcon className="w-4 h-4" />,
      label: "Panel de estado",
      href: "/dashboard/status-panel",
    },
    {
      icon: <DocumentTextIcon className="w-4 h-4" />,
      label: "Reportes",
      href: "/dashboard/reports",
    },
    {
      icon: <ExclamationTriangleIcon className="w-4 h-4" />,
      label: "Problemas",
      href: "/dashboard/problems",
    },
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: "Gestionar usuarios",
      href: "/dashboard/users",
    },
  ],
};

const directTo = (role: RolesDB) => {
  return RoutesSidebar[role][0].href;
};

const isRouteAuthorized = (role: RolesDB, route: string) => {
  return RoutesSidebar[role].some((r) => r.href === route);
};

export { RoutesSidebar, directTo, isRouteAuthorized };
