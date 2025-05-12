import { getObservationsByProblemId } from "@/services/problems.service";
import { ObservationDataGet } from "@/types/types";
import { useCallback, useEffect, useState } from "react";

const useFetchObservationProblem = ({
  problemId,
  page,
  size,
}: {
  problemId: string;
  page: number;
  size: number;
}) => {
  const [observations, setObservations] = useState<ObservationDataGet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchObservations = useCallback(async () => {
    setLoading(true);
    const response = await getObservationsByProblemId({
      problemId,
      page,
      size,
    });
    if (response.status) {
      setObservations(response.data as ObservationDataGet[]);
    } else {
      setError(response.data as string);
    }
    setLoading(false);
  }, [problemId, page, size]);

  useEffect(() => {
    fetchObservations();
  }, [problemId, page, size, fetchObservations]);

  return {
    observations,
    loading,
    error,
    fetchObservations,
  };
};

export { useFetchObservationProblem };
