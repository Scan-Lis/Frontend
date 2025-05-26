import { RequestResponse, UserDataGet } from "@/types/types";
import { http } from "@/utils/http";
import { AxiosError } from "axios";

export const getUsers = async ({
  url,
  page,
  size = 10,
}: {
  url: string;
  page: number;
  size?: number;
}): Promise<
  RequestResponse<{
    users: UserDataGet[];
    totalPages: number;
  }>
> => {
  try {
    const response = await http.get(`${url}?page=${page}&size=${size}`);
    return {
      data: {
        users: response.data.content as UserDataGet[],
        totalPages: response.data.totalPages,
      },
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al obtener los reportes",
      status: false,
    };
  }
};
