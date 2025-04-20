import { ReportDataGet, ReportDataPost, RequestResponse } from "@/types/types";
import { http } from "@/utils/http";
import { AxiosError } from "axios";

export const createReport = async (
  report: ReportDataPost
): Promise<RequestResponse<ReportDataPost>> => {
  try {
    const response = await http.post("/reporte", report);
    const data = response.data as ReportDataPost;
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

export const getReports = async ({
  url,
  page,
  size = 10,
}: {
  url: string;
  page: number;
  size?: number;
}): Promise<
  RequestResponse<{
    reports: ReportDataGet[];
    totalPages: number;
  }>
> => {
  try {
    const response = await http.get(`${url}?page=${page}&size=${size}`);
    return {
      data: {
        reports: response.data.content as ReportDataGet[],
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

export const updateStateStoreReport = async (
  idReport: number,
  newStateStore: boolean
): Promise<RequestResponse<ReportDataGet>> => {
  try {
    const response = await http.put(`/reporte/${idReport}/${newStateStore}`);
    const data = response.data as ReportDataGet;
    return {
      data,
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

export const deleteReport = async ({
  idReport,
  pcLabel,
}: {
  idReport: number;
  pcLabel: string;
}): Promise<RequestResponse<string>> => {
  try {
    const response = await http.delete(`/reporte/${idReport}`);
    return {
      data: `Reporte del computador ${pcLabel} eliminado con éxito`,
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

export const approveReport = async ({
  idReport,
  pcLabel,
}: {
  idReport: number;
  pcLabel: string;
}): Promise<RequestResponse<string>> => {
  try {
    await http.post(`/reporte/aprobar/${idReport}`);
    return {
      data: `El reporte del computador ${pcLabel} ha sido aprovado con éxito`,
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
