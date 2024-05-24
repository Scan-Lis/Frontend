import { useState } from "react";

const usePagination = () => {
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  return {
    page,
    setPage,
    totalPages,
    setTotalPages,
  };
};

export default usePagination;
