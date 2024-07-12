import { axiosPrivate } from "../../api/axios";
import { useEffect } from "react";
import useAuth from "./UseAuth";

export default function useAxiosPrivate() {
  const { auth } = useAuth();

  console.log("useAxiosPrivate", auth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.log("error 401");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }),
    [auth.token];

  return axiosPrivate;
}
