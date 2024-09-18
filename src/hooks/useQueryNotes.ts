import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Note } from "../types";
import { useError } from "./useError";

export const useQueryNotes = () => {
  const { switchErrorHandling } = useError();
  const getNotes = async () => {
    const { data } = await axios.get<Note[]>(
      `${process.env.REACT_APP_API_URL}/notes`,
      { withCredentials: true }
    );
    return data;
  };
  return useQuery<Note[], Error>({
    queryKey: ["notes"],
    queryFn: getNotes,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message);
      } else {
        switchErrorHandling(err.response.data);
      }
    },
  });
};
