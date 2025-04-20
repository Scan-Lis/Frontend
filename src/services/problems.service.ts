import { http } from "@/utils/http";
import { ProblemDataGet, RequestResponse } from "@/types/types";
import { AxiosError } from "axios";

export const getProblems = async ({
  url,
  page,
  size = 10,
}: {
  url: string;
  page: number;
  size?: number;
}): Promise<RequestResponse<ProblemDataGet[]>> => {
  try {
    const response = await http.get(`${url}?page=${page}&size=${size}`);
    return {
      data: response.data.content as ProblemDataGet[],
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al obtener los problemas",
      status: false,
    };
  }
};
