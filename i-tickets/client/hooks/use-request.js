import { useState } from 'react';
import axios from 'axios';

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState([]);

  const doRequest = async () => {
    try {
      reset();
      if (!url || !method) {
        throw Error('Parameters error');
      }

      const response = await axios[method](url, body);

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
