// Path: src/hooks/useLocalStorage.js
import { useCallback, useReducer } from "react";

const fetchReducer = (state, action) => {
  switch (action.type) {
    case "pending":
      return { ...state, status: "pending" };
    case "resolved":
      return { ...state, data: action.payload, status: "resolved" };
    case "rejected":
      return { ...state, error: action.payload, status: "rejected" };
    case "error":
      return { ...state, error: action.payload, status: "error" };
    case "idle":
      return { ...state, data: null, status: "idle" };
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};

/* GitHub Repository - Exercise */

export const useFetch = (url, config) => {
  const [{ status, data, error }, dispatch] = useReducer(fetchReducer, {
    status: "idle",
    data: null,
    error: null,
  });

  const run = useCallback(() => {
    dispatch({ type: "pending" });

    fetch(url, config)
      .then(async (res) => {
        const json = await res.json();
        if (res.ok) {
          dispatch({ type: "resolved", data: json });
        } else {
          dispatch({ type: "rejected", error: json });
        }
      })
      .catch((error) => {
        dispatch({ type: "rejected", error: error });
      });
  }, [url, config]);

  return { data, error, status };
};

