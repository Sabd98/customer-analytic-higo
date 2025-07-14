"use client";
import { SWRConfig } from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

//SWR configuration provider
export const SWRProvider = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError: (error) => {
          console.error("SWR Error:", error);
        },
      }}
    >
      {children}
    </SWRConfig>
  );
};
