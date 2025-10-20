import { useState, useCallback } from "react";
import useError from "./useError";

export const useRequest = () => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  //   Custom Hooks
  const { handleError } = useError();

  const makeRequest = useCallback(async (requestFn, ...args) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await requestFn(...args);

      const data = response?.data ?? response;

      setState((prev) => ({ ...prev, data }));
      return data;
    } catch (error) {
      setState((prev) => ({ ...prev, error }));
      handleError(error);
      throw error;
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  return { ...state, makeRequest };
};
