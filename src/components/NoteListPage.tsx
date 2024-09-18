import { FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import useStore from "../store";
import { useQueryNotes } from "../hooks/useQueryNotes";
import { useMutateNote } from "../hooks/useMutateNote";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { NoteItem } from "./NoteItem";

export const NoteListPage = () => {
  const queryClient = useQueryClient();
  const { editedNote } = useStore();
  const updateNote = useStore((state) => state.updateEditedNote);
  const { data, isLoading } = useQueryNotes();
  const { createNoteMutation, updateNoteMutation } = useMutateNote();
  const { logoutMutation } = useMutateAuth();

  const submitNoteHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedNote.id === 0)
      createNoteMutation.mutate({
        title: editedNote.title,
        body: editedNote.body,
      });
    else {
      updateNoteMutation.mutate(editedNote);
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries(["Notes"]);
  };

  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
      <div className="flex items-center my-3">
        <ShieldCheckIcon className="h-8 w-8 mr-3 text-indigo-500 cursor-pointer" />
        <span className="text-center text-3xl font-extrabold">
          Note Manager
        </span>
      </div>
      <ArrowRightOnRectangleIcon
        onClick={logout}
        className="h-6 w-6 my-6 text-blue-500 cursor-pointer"
      />
      <form onSubmit={submitNoteHandler} className="w-full max-w-md">
        <input
          className="mb-3 w-full px-3 py-2 border border-gray-300"
          placeholder="Title ?"
          type="text"
          onChange={(e) => updateNote({ ...editedNote, title: e.target.value })}
          value={editedNote.title || ""}
        />
        <textarea
          className="mb-3 w-full px-3 py-2 border border-gray-300"
          placeholder="Body ?"
          rows={4} // テキストエリアの高さを指定
          onChange={(e) => updateNote({ ...editedNote, body: e.target.value })}
          value={editedNote.body || ""}
        />
        <button
          className="disabled:opacity-40 w-full py-2 px-3 text-white bg-indigo-600 rounded"
          disabled={!editedNote.title}
        >
          {editedNote.id === 0 ? "Create" : "Update"}
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="my-5">
          {data?.map((Note) => (
            <NoteItem
              key={Note.id}
              id={Note.id}
              title={Note.title}
              body={Note.body}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
