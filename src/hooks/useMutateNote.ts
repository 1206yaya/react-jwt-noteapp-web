import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Note } from "../types";
import useStore from "../store";
import { useError } from "./useError";

export const useMutateNote = () => {
  const queryClient = useQueryClient();
  const { switchErrorHandling } = useError();
  const resetEditedNote = useStore((state) => state.resetEditedNote);

  const createNoteMutation = useMutation(
    (note: Omit<Note, "id" | "created_at" | "updated_at">) =>
      axios.post<Note>(`${process.env.NOTE_APP_API_URL}/notes`, note),
    {
      onSuccess: (res) => {
        const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);
        if (previousNotes) {
          queryClient.setQueryData(["notes"], [...previousNotes, res.data]);
        }
        resetEditedNote();
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      },
    }
  );
  const updateNoteMutation = useMutation(
    (note: Omit<Note, "created_at" | "updated_at">) =>
      axios.put<Note>(`${process.env.NOTE_APP_API_URL}/notes/${note.id}`, {
        title: note.title,
        body: note.body,
      }),
    {
      onSuccess: (res, variables) => {
        const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);
        if (previousNotes) {
          queryClient.setQueryData<Note[]>(
            ["notes"],
            previousNotes.map((note) =>
              note.id === variables.id ? res.data : note
            )
          );
        }
        resetEditedNote();
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      },
    }
  );
  const deleteNoteMutation = useMutation(
    (id: number) => axios.delete(`${process.env.NOTE_APP_API_URL}/notes/${id}`),
    {
      onSuccess: (_, variables) => {
        const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);
        if (previousNotes) {
          queryClient.setQueryData<Note[]>(
            ["notes"],
            previousNotes.filter((note) => note.id !== variables)
          );
        }
        resetEditedNote();
      },
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message);
        } else {
          switchErrorHandling(err.response.data);
        }
      },
    }
  );
  return {
    createNoteMutation,
    updateNoteMutation,
    deleteNoteMutation,
  };
};
