import { FC, memo } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import useStore from "../store";
import { Note } from "../types";
import { useMutateNote } from "../hooks/useMutateNote";

// Noteからcreated_atとupdated_atを除いたものを受け取る
const NoteItemMemo: FC<Omit<Note, "created_at" | "updated_at">> = ({
  id,
  title,
  body,
}) => {
  const updateNote = useStore((state) => state.updateEditedNote);
  const { deleteNoteMutation } = useMutateNote();
  return (
    <li className="my-3 p-4 border-b border-gray-300">
      <div className="flex justify-between items-center">
        <div>
          <span className="block text-lg font-bold text-gray-900">{title}</span>
          <span className="block text-sm text-gray-700 mt-1">{body}</span>
        </div>
        <div className="flex">
          <PencilIcon
            className="h-5 w-5 mx-1 text-blue-500 cursor-pointer"
            onClick={() => {
              updateNote({
                id: id,
                title: title,
                body: body,
              });
            }}
          />
          <TrashIcon
            className="h-5 w-5 text-red-500 cursor-pointer"
            onClick={() => {
              deleteNoteMutation.mutate(id);
            }}
          />
        </div>
      </div>
    </li>
  );
};
export const NoteItem = memo(NoteItemMemo);
