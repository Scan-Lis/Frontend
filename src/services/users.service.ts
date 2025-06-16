import { RequestResponse, UserDataGet, UserDataPost } from "@/types/types";
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

export const createUser = async (
  user: UserDataPost
): Promise<RequestResponse<{ token: string }>> => {
  try {
    const response = await http.post("/auth/register", user);
    return {
      data: response.data as { token: string },
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al crear el usuario",
      status: false,
    };
  }
};

export const deleteUser = async (
  email: string
): Promise<RequestResponse<void>> => {
  try {
    const normalizedEmail = encodeURI(email);
    const response = await http.delete(
      `/user/email/${normalizedEmail}?email=${normalizedEmail}`
    );
    return {
      data: response.data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al eliminar el usuario",
      status: false,
    };
  }
};

export const updatePassword = async (
  email: string,
  newPassword: string
): Promise<RequestResponse<void>> => {
  try {
    const url = `/user/admin/change-password?email=${email}&newPassword=${newPassword}`;
    const normalizedUrl = encodeURI(url);
    const response = await http.put(normalizedUrl);
    return {
      data: response.data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al actualizar la contraseña",
      status: false,
    };
  }
};

export const updateName = async (
  email: string,
  newName: string
): Promise<RequestResponse<void>> => {
  try {
    const url = `/user/email/${email}/name/${newName}?email=${email}&newName=${newName}`;
    const normalizedUrl = encodeURI(url);
    const response = await http.put(normalizedUrl);
    return {
      data: response.data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al eliminar el usuario",
      status: false,
    };
  }
};

export const updateEmail = async (
  email: string,
  newEmail: string
): Promise<RequestResponse<void>> => {
  try {
    const url = `/user/email/${email}/newEmail/${newEmail}?email=${email}&newEmail=${newEmail}`;
    const normalizedUrl = encodeURI(url);
    const response = await http.put(normalizedUrl);
    return {
      data: response.data,
      status: true,
    };
  } catch (error) {
    const err = error as AxiosError;
    const errMessage = err.response?.data as string;
    return {
      data: errMessage || "Error al eliminar el usuario",
      status: false,
    };
  }
};
