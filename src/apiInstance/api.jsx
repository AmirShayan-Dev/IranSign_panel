import axios from "axios";

// Default configuration for axios instance
const axiosInstance = axios.create();

// Example common HTTP status code
const commonHttpStatusCode = {
  cancelledByClientError: 499,
};

// Example function to get data from storage
export const getDataFromStorage = (key, storageType) => {
  if (storageType === "local") {
    return localStorage.getItem(key);
  }
  // Add other storage types if needed
  return null;
};

export const setDataToLocalStorage = (key, value, storageType) => {
  if (storageType === "local") {
    if (typeof value === "object") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  }
};
// Error and response handlers (to be implemented based on your needs)
const errorHandler = (error, dontHandleError) => {
  if (!dontHandleError) {
    // Implement your error handling logic here
    console.error("An error occurred:", error);
  }
  return Promise.reject(error);
};

const responseHandler = (response) => {
  // Implement your response handling logic here
  console.log("Response received:", response);
};

// Interceptor to handle response errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject({
        ...error,
        response: {
          status: commonHttpStatusCode.cancelledByClientError,
          message: "Client Closed Request",
          data: null,
        },
      });
    }
    return Promise.reject(error);
  }
);

// Utility function for making API calls
export const api = (
  options = {},
  dontHandleResponse = false,
  dontHandleError = false
) => {
  const stringifiedUserData = getDataFromStorage("userData", "local");
  const userData = JSON.parse(stringifiedUserData);
  return axiosInstance({
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${userData.accessToken}`, // Include the static token in the headers
    },
  })
    .then((response) => {
      if (!dontHandleResponse) responseHandler(response);
      return response;
    })
    .catch((error) => errorHandler(error, dontHandleError));
};

export default axiosInstance;
