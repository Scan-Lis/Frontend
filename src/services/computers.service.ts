import { PcInfoBack, RequestResponse } from "@/types/types";
import { http } from "@/utils/http";
import { AxiosError } from "axios";

export const getAllComputers = async (): Promise<
  RequestResponse<PcInfoBack[]>
> => {
  try {
    const response = await http.get("/computador/all");
    const data = response.data as PcInfoBack[];
    return {
      data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al obtener los computadores",
      status: false,
    };
  }
};

export const getComputersByRoom = async (
  sala: string
): Promise<RequestResponse<PcInfoBack[]>> => {
  try {
    const response = await http.get(`/computador/sala/${sala}`);
    const data = response.data as PcInfoBack[];
    return {
      data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al obtener los computadores",
      status: false,
    };
  }
};

export const getComputerByNumberAndRoom = async (
  sala: string,
  numberPC: number
): Promise<RequestResponse<PcInfoBack>> => {
  try {
    const response = await http.get(`/computador/${sala}/${numberPC}`);
    const data = response.data as PcInfoBack;
    return {
      data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    console.log(err);
    return {
      data: errMessage || "Error al obtener el computador",
      status: false,
    };
  }
};
