import { PcInfoBack, RequestResponse } from "@/types/types";
import { http } from "@/utils/http";
import { AxiosError } from "axios";

export const getAllComputers = async ({
  url,
  page,
  size = 10,
}: {
  url: string;
  page: number;
  size?: number;
}): Promise<
  RequestResponse<{
    computers: PcInfoBack[];
    totalPages: number;
  }>
> => {
  try {
    const response = await http.get(`${url}?page=${page}&size=${size}`);
    if (response.data.content === undefined && response.data !== undefined) {
      return {
        data: {
          computers: [response.data],
          totalPages: 0,
        },
        status: true,
      };
    }
    return {
      data: {
        computers: response.data.content as PcInfoBack[],
        totalPages: response.data.totalPages,
      },
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
    return {
      data: errMessage || "Error al obtener el computador",
      status: false,
    };
  }
};
