export interface LoginFields {
  correo: string;
  contrasena: string;
}

export interface UserProfileInfo {
  nombre: string;
  cargo: string;
}

export enum PcStateDB {
  Alerta = "Alerta",
  Mantenimiento = "Mantenimiento",
  Funcionando = "Funcionando",
  Fallando = "Fallando",
}

export const PcStateColorsDict = {
  [PcStateDB.Alerta]: "bg-alert",
  [PcStateDB.Mantenimiento]: "bg-orange-500",
  [PcStateDB.Funcionando]: "bg-success",
  [PcStateDB.Fallando]: "bg-failed",
} as const;

export enum SalasDB {
  Sala1 = "Sala1",
  Sala2 = "Sala2",
  Sala3 = "Sala3",
  Sala4 = "Sala4",
  Telematica = "Telematica",
  MovilLis = "MovilLis",
}

export const SalasLabels = {
  [SalasDB.Sala1]: "Sala 1",
  [SalasDB.Sala2]: "Sala 2",
  [SalasDB.Sala3]: "Sala 3",
  [SalasDB.Sala4]: "Sala 4",
  [SalasDB.Telematica]: "Telemática",
  [SalasDB.MovilLis]: "Móvil Lis",
} as const;

export enum RolesDB {
  ROLE_ADMIN = "Administrador",
  ROLE_AUXILIAR = "Auxiliar de Programación",
}

export const Routes = {
  [RolesDB.ROLE_ADMIN]: ["/dashboard/status-panel"],
  [RolesDB.ROLE_AUXILIAR]: ["/dashboard/status-panel"],
};

export interface PcInfoBack {
  numeroPc: number;
  estado: PcStateDB;
  sala: SalasDB;
}

export interface RequestResponse<T> {
  data: string | T;
  status: boolean;
}
