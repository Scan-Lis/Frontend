export interface LoginFields {
  correo: string;
  contrasena: string;
}

export interface UserProfileInfo {
  nombre: string;
  cargo: string;
}

export enum PcStateDB {
  alert = "alerta",
  maintenance = "mantenimiento",
  working = "funcionando",
  failing = "fallando",
}

export enum SalasDB {
  LIS1 = "Sala 1",
  LIS2 = "Sala 2",
  LIS3 = "Sala 3",
  LIS4 = "Sala 4",
  Telematica = "Telemática",
  MovilLis = "Móvil LIS",
}

export const SalasLabels = [
  SalasDB.LIS1,
  SalasDB.LIS2,
  SalasDB.LIS3,
  SalasDB.LIS4,
  SalasDB.Telematica,
  SalasDB.MovilLis,
];

export enum RolesDB {
  ROLE_ADMIN = "Administrador",
  ROLE_AUXILIAR = "Auxiliar de Programación",
}

export const Routes = {
  [RolesDB.ROLE_ADMIN]: ["/dashboard/status-panel"],
  [RolesDB.ROLE_AUXILIAR]: ["/dashboard/status-panel"],
};
