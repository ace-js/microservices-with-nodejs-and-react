import { useState } from "react";
import axios from "axios";

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      reset();
      if (!url || !method) {
        throw Error("Parameters error");
      }

      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess();
      }

      return { success: true, data: response.data };
    } catch (error) {
      if (error.response && error.response.data)
        setErrors(error.response.data.errors);
      return { success: false };
    }
  };

  const reset = () => setErrors([]);

  return { doRequest, reset, errors };
};

export default useRequest;
