import { http } from "@/utils/http";
import {
  ObservationDataGet,
  ProblemDataGet,
  RequestResponse,
} from "@/types/types";
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

export const markProblemAsSolved = async ({
  id,
  observacion,
}: {
  id: string;
  observacion: string;
}): Promise<RequestResponse<{}>> => {
  try {
    const response = await http.post(`/problema/solucionar/${id}`, observacion);
    return {
      data: response.data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al solucionar el problema",
      status: false,
    };
  }
};

export const assignProblemToUser = async ({
  problemId,
  userEmail,
}: {
  problemId: string;
  userEmail: string;
}): Promise<RequestResponse<ProblemDataGet>> => {
  try {
    const response = await http.post(`/problema/asignar`, {
      id: problemId,
      correoUsuario: userEmail,
    });
    return {
      data: response.data as ProblemDataGet,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al asignar el problema al usuario",
      status: false,
    };
  }
};

export const addObservationToProblem = async ({
  problemId,
  observation,
  author,
}: {
  problemId: string;
  observation: string;
  author: string;
}): Promise<RequestResponse<ProblemDataGet>> => {
  try {
    const response = await http.post(
      `/problema/agregarObservacion/${problemId}`,
      {
        observacion: observation,
        autor: author,
      }
    );
    return {
      data: response.data as ProblemDataGet,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al asignar el problema al usuario",
      status: false,
    };
  }
};

export const getObservationsByProblemId = async ({
  problemId,
  page,
  size = 10,
}: {
  problemId: string;
  page: number;
  size?: number;
}): Promise<RequestResponse<ObservationDataGet[]>> => {
  try {
    const response = await http.get(
      `/problema/observaciones/${problemId}?page=${page}&size=${size}`
    );
    return {
      data: response.data.content as ObservationDataGet[],
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al obtener las observaciones",
      status: false,
    };
  }
};
