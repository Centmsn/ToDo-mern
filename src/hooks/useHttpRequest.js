import { useState, useCallback } from "react";

export const useHttpRequest = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);

      try {
        const response = await fetch(url, {
          method: method,
          body: body,
          headers,
        });

        const responseData = await response.json();

        if (!response.ok) {
          setError(responseData.message);
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return { ...responseData, statusCode: response.status };
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
