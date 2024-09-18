import { create } from "zustand";

type EditedNote = {
  id: number;
  title: string;
  body: string;
};

type State = {
  editedNote: EditedNote;
  updateEditedNote: (payload: EditedNote) => void;
  resetEditedNote: () => void;
};

const useStore = create<State>((set) => ({
  editedNote: { id: 0, title: "", body: "" },
  updateEditedNote: (payload) =>
    set({
      editedNote: payload,
    }),
  resetEditedNote: () => set({ editedNote: { id: 0, title: "", body: "" } }),
}));

export default useStore;
