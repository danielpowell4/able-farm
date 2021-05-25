import { useState, useCallback } from "react";

const useError = (startingError = "") => {
  const [errorMsg, setErrorMsg] = useState(startingError);

  const onError = useCallback(error => {
    setErrorMsg(error.message || "Something went wrong");
  }, []);

  return [errorMsg, onError];
};

export default useError;
