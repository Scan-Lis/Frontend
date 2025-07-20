import { useCallback, useState, useEffect } from "react";
import { getUsers } from "@/services/users.service";
import { UserDataGet } from "@/types/types";

export const useGetUsers = () => {
  const [data, setData] = useState<UserDataGet[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (currentPage: number) => {
    try {
      setLoading(true);
      const response = await getUsers({
        url: "/user/all",
        page: currentPage,
        size: 10,
      });
      if (response.status) {
        const users = response.data as {
          users: UserDataGet[];
          totalPages: number;
        };
        setData(users.users);
        setTotalPages(users.totalPages);
      }
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(page);
  }, [page, fetchUsers]);

  return { data, loading, error, fetchUsers, totalPages, page, setPage };
};
